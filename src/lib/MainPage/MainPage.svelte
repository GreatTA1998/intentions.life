<script>
  import {
    getDateInDDMMYYYY,
  } from "/src/helpers/everythingElse.js";
  import {
    mostRecentlyCompletedTaskID,
    user,
    showSnackbar,
    hasInitialScrolled,
    todoTasks,
    calendarTasks
  } from "/src/store.js";
  // import AI from "../AI/AI.svelte";
  import TheSnackbar from "$lib/TheSnackbar.svelte";
  import CalendarThisWeek from "$lib/CalendarThisWeek.svelte";
  import PopupCustomerSupport from "$lib/PopupCustomerSupport.svelte";
  import NavbarAndContentWrapper from "$lib/NavbarAndContentWrapper.svelte";
  import DetailedCardPopup from "$lib/DetailedCardPopup/DetailedCardPopup.svelte";
  import ManageReusableTasks from "$lib/ManageReusableTasks.svelte";
  import UncertainMilestones from "$lib/UncertainMilestones.svelte";
  import MultiPhotoUploader from "$lib/MultiPhotoUploader.svelte";
  // import {
  //   handleSW,
  //   handleNotificationPermission,
  // } from "./handleNotifications.js";
  import { onDestroy, onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import { getAuth, signOut } from "firebase/auth";
  import { db } from "../../back-end/firestoreConnection.js";
  import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
  import NewThisWeekTodo from "$lib/NewThisWeekTodo.svelte";
  import { handleInitialTasks } from "./handleTasks.js";
  import MobileMode from "$lib/MobileMode/MobileMode.svelte"
  import { DateTime } from 'luxon'
  import { createTaskNode, updateTaskNode, deleteTaskNode } from '/src/helpers/crud.js'

  let currentMode = "Week"; 
  const userDocPath = `users/${$user.uid}`;

  let clickedTaskID = ''
  let clickedTask = {}
  
  let calStartDateClassObj = new Date();
  let allTasks = null;

  let unsub;
  let isMobile = false;

  $: if (clickedTaskID) {
    if (clickedTaskID) clickedTask = findTask(clickedTaskID)
    else clickedTask = {}
  }

  function findTask (id) {
    for (const elem of [...$todoTasks, ...$calendarTasks]) {
      if (elem.id === id) {
        return elem
      }
    }
  }

  function openDetailedCard({ task }) {
    clickedTaskID = task.id
  }

  // Function to check if the user is on a mobile device
  const checkMobile = () => {
    isMobile = window.innerWidth <= 768; // You can adjust the width threshold as needed
  };

  onMount(async () => {
    checkMobile();
    window.addEventListener("resize", checkMobile); // Update on resize

    // handleNotificationPermission($user);
    // handleSW();

    handleInitialTasks($user.uid);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  });

  function handleLogoClick() {
    if (confirm("Log out and return to home page tutorials?")) {
      const auth = getAuth();
      signOut(auth).catch(console.error);
      goto("/");
    }
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

  function incrementDateClassObj({ days }) {
    const d = calStartDateClassObj;
    const offset = days * (24 * 60 * 60 * 1000);
    d.setTime(d.getTime() + offset);
    calStartDateClassObj = d; // to manually trigger reactivity
  }

  // FOR DEBUGGING PURPOSES, TURN IT ON TO TRUE TO RUN SCRIPT ONCE
  let testRunOnce = false;


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

  async function changeTaskStartTime({ id, timeOfDay, dateScheduled, newYYYY = DateTime.now().toFormat('yyyy') }) {
    // TO-DO: fix the rest of the app to explicitly set the correct year, especially before 2025
    const yyyy = newYYYY
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
  <MobileMode/>
{:else}
  {#if clickedTaskID}
    <DetailedCardPopup
      taskObject={clickedTask}
      on:task-update={(e) => updateTaskNode(e.detail)}
      on:task-reusable={() => createReusableTaskTemplate(clickedTask.id)}
      on:task-click={(e) => openDetailedCard(e.detail)}
      on:card-close={() => clickedTaskID = ''}
      on:task-delete={(e) => deleteTaskNode(e.detail)}
      on:task-checkbox-change={(e) =>
        updateTaskNode({
          id: e.detail.id,
          keyValueChanges: { isDone: e.detail.isDone },
        })}
    />
  {/if}

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

      <div style="display: flex; gap: 24px; align-items: center;">
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
        <!-- <AI /> -->
      {/if}
    </div>
  </NavbarAndContentWrapper>
{/if}

<style src="./MainPage.css"></style>
