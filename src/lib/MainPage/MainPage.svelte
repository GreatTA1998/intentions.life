<script>
  import {
    createNewInstancesOfWeeklyRepeatingTasks,
    createNewInstancesOfMonthlyRepeatingTasks,
  } from "/src/helpers/periodicRepeat.js";
  import {
    computeDayDifference,
    getDateOfToday,
    getDateInDDMMYYYY,
    convertToISO8061,
  } from "/src/helpers/everythingElse.js";
  import applyTaskSchema from "../../helpers/applyTaskSchema.js";
  import {
    mostRecentlyCompletedTaskID,
    user,
    showSnackbar,
    hasInitialScrolled,
  } from "/src/store.js";
  import AI from "../AI/AI.svelte";
  import BedtimePopupMaplestoryMusic from "$lib/BedtimePopupMaplestoryMusic.svelte";
  import TheSnackbar from "$lib/TheSnackbar.svelte";
  import CalendarThisWeek from "$lib/CalendarThisWeek.svelte";
  import BackgroundRainScene from "$lib/BackgroundRainScene.svelte";
  import PopupCustomerSupport from "$lib/PopupCustomerSupport.svelte";
  import NavbarAndContentWrapper from "$lib/NavbarAndContentWrapper.svelte";
  import DetailedCardPopup from "$lib/DetailedCardPopup.svelte";
  import ZenJournal from "$lib/ZenJournal.svelte";
  import ZenJournalLeftNavigation from "$lib/ZenJournaLeftNavigation.svelte";
  import ManageReusableTasks from "$lib/ManageReusableTasks.svelte";
  import UncertainMilestones from "$lib/UncertainMilestones.svelte";
  import MultiPhotoUploader from "$lib/MultiPhotoUploader.svelte";
  import {handleSW, handleNotificationPermission} from './notifications.js'
  import { onDestroy, onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import { getAuth, signOut } from "firebase/auth";
  import {db} from "../../back-end/firestoreConnection.js";
  import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
  import {
    setFirestoreDoc,
    updateFirestoreDoc,
    deleteFirestoreDoc,
    getFirestoreCollection,
  } from "/src/helpers/crud.js";
  import NewThisWeekTodo from "$lib/NewThisWeekTodo.svelte";
  import { deleteObject, getStorage, ref } from "firebase/storage";
  import Tasks from "../../back-end/Tasks.js";
  import { size, cushion } from "/src/helpers/constants.js";
  import { DateTime } from "luxon";
  import {
    createOnLocalState,
    updateLocalState,
    deleteFromLocalState,
    buildCalendarDataStructures,
    buildTodoDataStructures,
  } from "/src/helpers/maintainState.js";
  import MobileView from "../MobileView/MobileView.svelte";

  let currentMode = "Week"; // weekMode hourMode monthMode
  const userDocPath = `users/${$user.uid}`;

  let isDetailedCardOpen = false;

  let calStartDateClassObj = new Date();
  let currentJournalEntryMMDD = getDateOfToday();
  let allTasks = null;
  let futureScheduledTasks = []; // AF([])

  let clickedTask = {};
  let unsub;
  let isMobile = false;

  // Function to check if the user is on a mobile device
  const checkMobile = () => {
    isMobile = window.innerWidth <= 768; // You can adjust the width threshold as needed
  };


  onMount(async () => {
    checkMobile();
    window.addEventListener("resize", checkMobile); // Update on resize

    handleSW()
    handleNotificationPermission();

    const today = DateTime.now();
    const left = today.minus({ days: size + cushion });
    const right = today.plus({ days: size + cushion });

    Tasks.getByDateRange(
      $user.uid,
      left.toFormat("yyyy-MM-dd"),
      right.toFormat("yyyy-MM-dd")
    ).then((scheduledTasks) =>
      buildCalendarDataStructures({ flatArray: scheduledTasks })
    );

    Tasks.getUnscheduled($user.uid).then((unscheduledTasks) =>
      buildTodoDataStructures({ flatArray: unscheduledTasks })
    );

    //   TO-DO: fix repeating tasks not getting pre-generated on time
    //   if (isInitialFetch) {
    //     isInitialFetch = false
    //     maintainPreviewWindowForPeriodicTasks()
    //   }

    // SCRIPTS
    // findActiveUsers()
    // garbageCollectInvalidTasks($user)
    // return
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  });

  function handleLogoClick(setIsPopupOpen) {
    if (confirm("Log out and return to home page tutorials?")) {
      signOutOnFirebase();
      goto("/");
    }
  }

  function signOutOnFirebase() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  function createSubtask({ id, parentID, newTaskObj }) {
    // the parent needs to update its pointers
    updateTaskNode({
      id: parentID,
      keyValueChanges: { children: arrayUnion(id) },
    });
    createTaskNode({ id, newTaskObj });
  }

  onDestroy(() => {
    if (unsub) unsub();
  });

  const tasksPath = `/users/${$user.uid}/tasks/`;

  async function maintainPreviewWindowForPeriodicTasks() {
    if (
      $user.lastRanRepeatISO &&
      1 > computeDayDifference(new Date($user.lastRanRepeatISO), new Date())
    ) {
      return; // already did daily check
    }

    const periodicTasks = await getFirestoreCollection(
      `/users/${$user.uid}/periodicTasks`
    );
    handleWeekly(periodicTasks);
    await handleMonthly(periodicTasks);

    updateFirestoreDoc(`/users/${$user.uid}`, {
      lastRanRepeatISO: new Date().toISOString(),
    });
  }

  async function handleMonthly(periodicTasks) {
    const monthlyTemplates = periodicTasks.filter((t) => t.repeatOnDayOfMonth);
    for (const monthlyTemplate of monthlyTemplates) {
      const { lastRanRepeatISO } = monthlyTemplate;

      // backwards compatibility
      if (!lastRanRepeatISO) {
        await createNewInstancesOfMonthlyRepeatingTasks({
          monthlyTemplate,
          userDoc: $user,
        });
      }

      if (new Date(lastRanRepeatISO).getMonth() !== new Date().getMonth()) {
        await createNewInstancesOfMonthlyRepeatingTasks({
          monthlyTemplate,
          userDoc: $user,
        });
      }
    }
  }

  function handleWeekly(periodicTasks) {
    const weeklyTemplates = periodicTasks.filter((t) => t.repeatOnDayOfWeek);
    for (const weeklyTemplate of weeklyTemplates) {
      const { lastRanRepeatISO, numOfWeeksInAdvance } = weeklyTemplate;

      // backwards compatibility
      if (!lastRanRepeatISO) {
        createNewInstancesOfWeeklyRepeatingTasks({
          weeklyTemplate,
          userDoc: $user,
        });
      }

      const daysSinceLastRepeat = computeDayDifference(
        new Date(lastRanRepeatISO),
        new Date()
      );
      if (daysSinceLastRepeat > 7 * numOfWeeksInAdvance) {
        createNewInstancesOfWeeklyRepeatingTasks({
          weeklyTemplate,
          userDoc: $user,
        });
      }
    }
  }

  async function createTaskNode({ id, newTaskObj }) {
    try {
      const newTaskObjChecked = await applyTaskSchema(newTaskObj, $user);

      setFirestoreDoc(tasksPath + id, newTaskObjChecked); // hope mf doesn't notice :>
      createOnLocalState({ createdNode: { id, ...newTaskObjChecked } });
    } catch (error) {
      console.log(error);
      alert("Database update failed, please reload");
    }
  }

  async function updateTaskNode({ id, keyValueChanges }) {
    updateFirestoreDoc(tasksPath + id, keyValueChanges).catch((err) => {
      alert(
        "there was an error in atempting to save changes to the db, please reload "
      );
      console.error("error in updateTaskNode: ", err);
    });
    // we purposely don't await, so the UI experience is much better
    // without an unsettling delay - if it's a divergence in state we'll just throw an error (0.01% chance)
    updateLocalState({ id, keyValueChanges });
  }

  // THIS IS STILL NOT WORKING: THE ADOPTION IS NOT WORKING, RIGHT NOW ALL THE
  // SUBTREE WILL BE GONE FOR SOME REASON
  function deleteTaskNode({
    id,
    parentID,
    childrenIDs,
    imageDownloadURL = "",
    imageFullPath = "",
  }) {
    if (parentID !== "") {
      updateFirestoreDoc(tasksPath + parentID, {
        childrenIDs: arrayRemove(id),
      });
      // parent will be deleted, so the grandparent will take care of the children
      if (childrenIDs) {
        updateFirestoreDoc(tasksPath + parentID, {
          childrenIDs: arrayUnion(...childrenIDs),
        });
      }
    }

    // temporary to clean up tasks that were created that didn't conform to the schema
    // surprisngly many, keep it in to save time
    if (childrenIDs) {
      for (const childID of childrenIDs) {
        updateFirestoreDoc(tasksPath + childID, {
          parentID: parentID,
        });
      }
    }

    // TO-DO: handle pointerless images
    if (imageFullPath) {
      const storage = getStorage();
      deleteObject(ref(storage, imageFullPath));
    }

    // now safely delete itself
    deleteFirestoreDoc(tasksPath + id);

    deleteFromLocalState({ id });
  }

  function updateMusicAutoplay(e) {
    const { newVal } = e.detail;
    updateDoc(doc(db, userDocPath), {
      willMusicAutoplay: newVal,
    });
  }

  function updateJournalEntryTitle({ entryMMDD, newTitle }) {
    let updateObj = {};
    if ($user.journalTitleFromMMDD)
      updateObj = { ...$user.journalTitleFromMMDD };

    updateObj[entryMMDD] = newTitle;
    updateDoc(doc(db, userDocPath), {
      journalTitleFromMMDD: updateObj,
    });
  }

  function incrementDateClassObj({ days }) {
    const d = calStartDateClassObj;
    const offset = days * (24 * 60 * 60 * 1000);
    d.setTime(d.getTime() + offset);
    calStartDateClassObj = d; // to manually trigger reactivity
  }

  function changeJournal({ newJournal }) {
    updateDoc(doc(db, userDocPath), {
      journal: newJournal,
    });
  }

  // FOR DEBUGGING PURPOSES, TURN IT ON TO TRUE TO RUN SCRIPT ONCE
  let testRunOnce = false;

  function openDetailedCard({ task }) {
    clickedTask = task;
    isDetailedCardOpen = true;
  }

  function traverseAndUpdateTree({ fulfilsCriteria, applyFunc }) {
    const artificialRootNode = {
      name: "root",
      children: allTasks,
    };
    helperFunction({ node: artificialRootNode, fulfilsCriteria, applyFunc });
  }

  // useful helper function for task update operations
  function helperFunction({ node, fulfilsCriteria, applyFunc }) {
    if (fulfilsCriteria(node)) {
      applyFunc(node);
    }
    for (const child of node.children) {
      helperFunction({ node: child, fulfilsCriteria, applyFunc });
    }
  }

  // quick-fix for NaN/NaN bug
  function collectFutureScheduledTasksToArray() {
    const yearNumber = new Date().getFullYear();
    futureScheduledTasks = []; // reset
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => {
        if (!task.startTime || !task.startDate) return;
        if (task.willRepeatOnWeekDayNumber) return;
        const d1 = new Date(convertToISO8061({ mmdd: task.startDate }));

        // setHours(hoursValue 0 - 23, minutesValue 0 - 59)
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
        const [hh, mm] = task.startTime.split(":");
        d1.setHours(Number(hh), Number(mm));
        return (
          task.startDate &&
          task.startDate !== "NaN/NaN" &&
          !task.willRepeatOnWeekDayNumber &&
          task.startTime &&
          d1.getTime() >= new Date().getTime() &&
          Number(task.startYYYY) === Number(yearNumber.toString())
        ); // this line is a quickfix because we don't store YYYY values in legacy versions
      }, // 'NaN' quick-fix bug
      applyFunc: (task) =>
        (futureScheduledTasks = [...futureScheduledTasks, task]),
    });

    // TO-DO: don't include all the tasks in the future, only if it is bounded by < 7 days for the week view, and < 30 days for the month view
    futureScheduledTasks.sort((task1, task2) => {
      const d1 = new Date(task1.startDate);
      const d2 = new Date(task2.startDate);
      return d1.getTime() - d2.getTime(); // most recent to the top??
    });
  }

  async function createReusableTaskTemplate(id) {
    traverseAndUpdateTree({
      fulfilsCriteria: (task) => task.id === id,
      applyFunc: async (task) => {
        const userRef = doc(db, userDocPath);
        await updateDoc(userRef, {
          reusableTaskTemplates: arrayUnion(task),
        });
      },
    });
  }

  async function changeTaskStartTime({ id, timeOfDay, dateScheduled }) {
    // get an ISO YYYY-MM-DD format
    const yyyy = "2024"; // TO-DO: change this by 2025
    const [mm, dd] = dateScheduled.split("/");

    updateTaskNode({
      id,
      keyValueChanges: {
        startTime: timeOfDay,
        startDateISO: yyyy + "-" + mm + "-" + dd,
      },
    });
  }

  async function changeTaskDeadline({ id, deadlineTime, deadlineDate }) {
    updateTaskNode({
      id,
      keyValueChanges: {
        deadlineTime: deadlineTime,
        deadlineDate: deadlineDate,
      },
    });
  }

  function createNewRootTask(newTaskObj) {
    createTaskNode({
      id: newTaskObj.id,
      newTaskObj: newTaskObj,
    });
  }

  // mvoe to this week's todo
  function putTaskToThisWeekTodo(e) {
    e.preventDefault();
    // for backwards compatibility
    let id;
    if (e.detail.id) {
      id = e.detail.id;
    } else {
      id = e.dataTransfer.getData("text/plain");
    }
    // get next week's date class object
    const d = new Date();
    for (let i = 0; i < 7; i++) {
      d.setDate(d.getDate() + 1);
    }

    updateTaskNode({
      id,
      keyValueChanges: {
        startTime: "",
        startDate: "",
        deadlineDate: getDateInDDMMYYYY(d),
        deadlineTime: "07:00",
      },
    });
  }
</script>

{#if isMobile}
  <MobileView />
{:else}
  {#key clickedTask}
    {#if isDetailedCardOpen}
      <DetailedCardPopup
        taskObject={clickedTask}
        on:task-update={(e) => updateTaskNode(e.detail)}
        on:task-reusable={() => createReusableTaskTemplate(clickedTask.id)}
        on:task-click={(e) => openDetailedCard(e.detail)}
        on:card-close={() => (isDetailedCardOpen = false)}
        on:task-delete={(e) => deleteTaskNode(e.detail)}
        on:task-checkbox-change={(e) =>
          updateTaskNode({
            id: e.detail.id,
            keyValueChanges: { isDone: e.detail.isDone },
          })}
      />
    {/if}
  {/key}

  <!-- UNDO COMPLETED SNACKBAR -->
  {#if $mostRecentlyCompletedTaskID}
    <TheSnackbar
      on:undo-task-completion={() => {
        updateTaskNode({
          id: $mostRecentlyCompletedTaskID,
          keyValueChanges: {
            isDone: false,
          },
        });
        mostRecentlyCompletedTaskID.set("");
      }}
    ></TheSnackbar>
  {/if}

  <!-- Copy & paste snackbar -->
  {#if $showSnackbar}
    <TheSnackbar>Email copied to clipboard successfully.</TheSnackbar>
  {/if}

  <NavbarAndContentWrapper>
    <div
      slot="navbar"
      class="top-navbar"
      class:transparent-glow-navbar={currentMode === "Day"}
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        on:click={() => handleLogoClick()}
        src="/trueoutput-square-nobg.png"
        style="width: 38px; height: 38px; margin-right: 6px; margin-left: -4px; cursor: pointer;"
        alt=""
      />

      <div class="day-week-toggle-segment">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={() => (currentMode = "AI")}
          class="ux-tab-item"
          class:active-ux-tab={currentMode === "AI"}
          class:transparent-inactive-tab={currentMode === "Day"}
        >
          <span class="material-symbols-outlined" style="font-size: 32px;">
            psychology
          </span>
        </div>

        <!-- quickfix so pressing home ALWAYS recalibrates you to today's region -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={async () => {
            currentMode = "";
            await tick();
            hasInitialScrolled.set(false);
            currentMode = "Week";
          }}
          class="ux-tab-item"
          class:active-ux-tab={currentMode === "Week"}
          class:transparent-inactive-tab={currentMode === "Day"}
        >
          <span class="material-symbols-outlined" style="font-size: 32px;">
            house
          </span>
        </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={() => (currentMode = "ManageRepeats")}
          class="ux-tab-item"
          class:active-ux-tab={currentMode === "ManageRepeats"}
          class:transparent-inactive-tab={currentMode === "Day"}
        >
          <span
            class="material-symbols-outlined"
            class:blue-icon={currentMode === "Dashboard"}
            style="font-size: 32px;"
          >
            restart_alt
          </span>
        </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={() => (currentMode = "Year")}
          class="ux-tab-item"
          class:active-ux-tab={currentMode === "Year"}
          class:transparent-inactive-tab={currentMode === "Day"}
        >
          <span class="material-symbols-outlined" style="font-size: 36px;">
            sports_score
          </span>
        </div>
      </div>

      <!-- 
      KEEP THIS SO YOU CAN MIGRATE THIS TO YOUR JOURNAL APP
    <div on:click={() => currentMode = 'Day'}
      class="ux-tab-item hide-for-mobile" 
      class:transparent-glow-tab={currentMode === 'Day'} 
      style="margin-right: 8px;"
    >
      <span on:click={() => currentMode === 'Day' ? currentMode = 'Week' : currentMode = 'Day'} class="material-symbols-outlined"
        style="font-size: 30px; margin-top: 4px; color: black;"  
      >
        menu_book
      </span>
    </div> -->

      <div style="display: flex; gap: 24px; align-items: center;">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- <span on:click={() => goto(`/${$user.uid}/mobile`)} class="material-symbols-outlined mika-hover responsive-icon-size">
        smartphone
      </span> -->

        <MultiPhotoUploader />

        <PopupCustomerSupport let:setIsPopupOpen>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            on:click={() => setIsPopupOpen({ newVal: true })}
            class="material-symbols-outlined mika-hover responsive-icon-size"
          >
            contact_support
          </span>
        </PopupCustomerSupport>
      </div>
    </div>

    <div slot="content" style="display: flex; flex-grow: 1; height: 100%;">
      {#if currentMode === "ManageRepeats"}
        <ManageReusableTasks {allTasks} />
      {:else if currentMode === "Day"}
        <!-- Show daytime art from 5 am - 7 pm, note `.getHours()` is 0-indexed from 0 to 23 -->
        {#if new Date().getHours() > 5 && new Date().getHours() < 18}
          <BedtimePopupMaplestoryMusic
            willMusicAutoplay={$user.willMusicAutoplay}
          />
        {:else}
          <BackgroundRainScene willMusicAutoplay={$user.willMusicAutoplay} />
        {/if}

        <div class="container-for-float-cards">
          <div class="glow-card-hover-effect rounded-card" style="width: 36%;">
            <ZenJournalLeftNavigation
              journal={$user.journal}
              journalTitleFromMMDD={$user.journalTitleFromMMDD}
              {currentJournalEntryMMDD}
              on:toggle-music-autoplay={(e) => updateMusicAutoplay(e)}
              on:journal-entry-select={(e) =>
                (currentJournalEntryMMDD = e.detail.newMMDD)}
            />
          </div>

          <div
            class="glow-card-hover-effect rounded-card"
            style="margin-left: 4%; width: 60%;"
          >
            {#key currentJournalEntryMMDD}
              <ZenJournal
                journal={$user.journal}
                journalTitleFromMMDD={$user.journalTitleFromMMDD}
                {currentJournalEntryMMDD}
                willMusicAutoplay={$user.willMusicAutoplay}
                on:toggle-music-autoplay={(e) => updateMusicAutoplay(e)}
                on:journal-update={(e) => changeJournal(e.detail)}
                on:journal-entry-title-update={(e) =>
                  updateJournalEntryTitle(e.detail)}
              />
            {/key}
          </div>
        </div>

        <!-- WEEK MODE -->
      {:else if currentMode === "Week"}
        <!-- 1st flex child -->
        <div class="todo-container">
          <NewThisWeekTodo
            on:new-root-task={(e) => createNewRootTask(e.detail)}
            on:task-unscheduled={(e) => putTaskToThisWeekTodo(e)}
            on:task-click={(e) => openDetailedCard(e.detail)}
            on:subtask-create={(e) => createSubtask(e.detail)}
            on:task-checkbox-change={(e) =>
              updateTaskNode({
                id: e.detail.id,
                keyValueChanges: { isDone: e.detail.isDone },
              })}
          />
        </div>

        <!-- 2nd flex child -->
        <div
          id="the-only-scrollable-container"
          class="calendar-section-flex-child"
        >
          <CalendarThisWeek
            {calStartDateClassObj}
            on:calendar-shifted={(e) =>
              incrementDateClassObj({ days: e.detail.days })}
            on:new-root-task={(e) => createNewRootTask(e.detail)}
            on:task-click={(e) => openDetailedCard(e.detail)}
            on:task-update={(e) =>
              updateTaskNode({
                id: e.detail.id,
                keyValueChanges: e.detail.keyValueChanges,
              })}
            on:task-scheduled={(e) => changeTaskStartTime(e.detail)}
            on:task-dragged={(e) => changeTaskDeadline(e.detail)}
            on:task-checkbox-change={(e) =>
              updateTaskNode({
                id: e.detail.id,
                keyValueChanges: { isDone: e.detail.isDone },
              })}
          />
        </div>
        <!-- END OF WEEK MODE SECTION -->
      {:else if currentMode === "Year"}
        <UncertainMilestones />
      {:else if currentMode === "AI"}
        <AI />
      {/if}
    </div>
  </NavbarAndContentWrapper>
{/if}

<style>
  .responsive-icon-size {
    font-size: clamp(1rem, 4vw, 1.5rem); /* font-size: 24px;  */
    cursor: pointer;
    color: rgb(120, 120, 120);
  }

  .todo-container {
    min-width: 360px;
    background-color: var(--todo-list-bg-color);
    font-size: 2em;
    overflow-y: auto;
  }

  .rounded-card {
    /* border-radius: 36px; */
    padding: 24px;
    border-radius: 6px;
  }

  .rounded-card::webkit-scrollbar {
    width: 0px;
  }

  .container-for-float-cards {
    margin: auto;
    height: 70%;
    min-width: 800px;
    width: 70%;
    max-width: 1200px;
    z-index: 1;
    display: flex;
  }

  #the-only-scrollable-container {
    position: relative;
    overflow: auto;
  }

  .calendar-section-flex-child {
    /* this is funnily enough to fix a patch of white between the header and the calendar column */
    background-color: var(--calendar-bg-color);
  }

  .day-week-toggle-segment {
    display: flex;
    margin-left: 64px;
    width: fit-content;
    justify-content: space-evenly;
    border-bottom: 0px solid rgb(200, 200, 200);
    margin: auto;
  }

  .ux-tab-item {
    box-sizing: border-box;
    height: 60px;
    width: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    color: rgb(120, 120, 120);
    font-weight: 300;
  }

  .transparent-glow-tab {
    color: white;
    font-weight: 500;
    border-bottom: 1px solid white;
  }

  .transparent-inactive-tab {
    color: black;
    font-weight: 400;
  }

  .active-ux-tab {
    border-bottom: 1px solid var(--location-indicator-color);
    color: var(--location-indicator-color);
    font-weight: 500;
  }

  .transparent-glow-navbar {
    background-color: rgba(150, 150, 150, 0.1);
    border-bottom: none;
  }

  .glow-card-hover-effect {
    /* BOX SHADOW */
    /* #48abe0; was the original glow box shadow color */
    /* box-shadow: 0 0 48px 15px #3b3b3b;   */
    box-shadow: 0 0 48px 15px #ffffff3b;

    /* Additional ways to blend the cards to the background suggested by Claude AI */
    /* 90% opacity without affecting children */
    background-color: rgba(40, 40, 40, 0.75);
    color: white;
  }

  .mika-hover {
    transition: all 0s ease-out;
  }

  .mika-hover:hover {
    color: #0085ff;
    /* background-color: #0085FF; */
    /* border: 1px solid #0085FF; */
    transition: all 0.2s ease-out;
  }

  .blue-icon {
    color: #0085ff;
  }

  /* #radio-player-with-art {
    background-image: url('../maplestory-watercolor.jpg')
  } */

  @media (max-width: 1279.99px) {
    .todo-container {
      /* reduce todo-list width by 60px for tablets */
      min-width: 300px;
    }
  }

  /* anything below this minimum tablet width is considered a phone */
  @media (max-width: 767.99px) {
    /* i.e. flatten all the scrolling onto one massive plane, instead of lots of separate scrolling contexts */
    #the-only-scrollable-container {
      overflow: visible;
    }

    .todo-container {
      overflow: visible;
    }
  }
</style>
