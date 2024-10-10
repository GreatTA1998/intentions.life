<script>
  import {
    getDateInDDMMYYYY,
  } from "/src/helpers/everythingElse.js";
  import applyTaskSchema from "../../helpers/applyTaskSchema.js";
  import {
    mostRecentlyCompletedTaskID,
    user,
    showSnackbar,
    hasInitialScrolled,
  } from "/src/store.js";
  import AI from "../AI/AI.svelte";
  import TheSnackbar from "$lib/TheSnackbar.svelte";
  import CalendarThisWeek from "$lib/CalendarThisWeek.svelte";
  import PopupCustomerSupport from "$lib/PopupCustomerSupport.svelte";
  import NavbarAndContentWrapper from "$lib/NavbarAndContentWrapper.svelte";
  import DetailedCardPopup from "$lib/DetailedCardPopup/DetailedCardPopup.svelte";
  import ManageReusableTasks from "$lib/ManageReusableTasks.svelte";
  import UncertainMilestones from "$lib/UncertainMilestones.svelte";
  import MultiPhotoUploader from "$lib/MultiPhotoUploader.svelte";
  import {
    handleSW,
    handleNotificationPermission,
  } from "./handleNotifications.js";
  import { onDestroy, onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import { getAuth, signOut } from "firebase/auth";
  import { db } from "../../back-end/firestoreConnection.js";
  import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
  import {
    setFirestoreDoc,
    updateFirestoreDoc,
    deleteFirestoreDoc,
  } from "/src/helpers/crud.js";
  import NewThisWeekTodo from "$lib/NewThisWeekTodo.svelte";
  import { deleteObject, getStorage, ref } from "firebase/storage";
  import { handleInitialTasks } from "./handleTasks.js";
  import {
    createOnLocalState,
    updateLocalState,
    deleteFromLocalState,
  } from "/src/helpers/maintainState.js";
  import MobileView from "../MobileView/MobileView.svelte";

  let currentMode = "Week"; 
  const userDocPath = `users/${$user.uid}`;

  let isDetailedCardOpen = false;

  let calStartDateClassObj = new Date();
  let allTasks = null;

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

    handleNotificationPermission($user);
    handleSW();

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

  const tasksPath = `/users/${$user.uid}/tasks/`;

  async function createTaskNode({ id, newTaskObj }) {
    try {
      const newTaskObjChecked = await applyTaskSchema(newTaskObj, $user);

      setFirestoreDoc(tasksPath + id, newTaskObjChecked); // hope mf doesn't notice :>
      createOnLocalState({ createdNode: { id, ...newTaskObjChecked } });
    } catch (error) {
      console.error('error creating task node: ', error);
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
    updateLocalState({ id, keyValueChanges });
  }

  // THIS IS STILL NOT WORKING: THE ADOPTION IS NOT WORKING, RIGHT NOW ALL THE
  // SUBTREE WILL BE GONE FOR SOME REASON
  function deleteTaskNode({ id, parentID, childrenIDs, imageFullPath = "" }) {
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

    if (imageFullPath) {
      const storage = getStorage();
      deleteObject(ref(storage, imageFullPath));
    }

    // now safely delete itself
    deleteFirestoreDoc(tasksPath + id);

    deleteFromLocalState({ id });
  }

  function incrementDateClassObj({ days }) {
    const d = calStartDateClassObj;
    const offset = days * (24 * 60 * 60 * 1000);
    d.setTime(d.getTime() + offset);
    calStartDateClassObj = d; // to manually trigger reactivity
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
        <AI />
      {/if}
    </div>
  </NavbarAndContentWrapper>
{/if}

<style src="./MainPage.css"></style>
