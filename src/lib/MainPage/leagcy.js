// Zen

//   TO-DO: fix repeating tasks not getting pre-generated on time
//   if (isInitialFetch) {
//     isInitialFetch = false
//     maintainPreviewWindowForPeriodicTasks()
//   }

function updateMusicAutoplay(e) {
  const { newVal } = e.detail;
  updateDoc(doc(db, userDocPath), {
    willMusicAutoplay: newVal,
  });
}

function updateJournalEntryTitle({ entryMMDD, newTitle }) {
  let updateObj = {};
  if ($user.journalTitleFromMMDD) updateObj = { ...$user.journalTitleFromMMDD };

  updateObj[entryMMDD] = newTitle;
  updateDoc(doc(db, userDocPath), {
    journalTitleFromMMDD: updateObj,
  });
}

function changeJournal({ newJournal }) {
  updateDoc(doc(db, userDocPath), {
    journal: newJournal,
  });
}

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


//   <!-- 
//   KEEP THIS SO YOU CAN MIGRATE THIS TO YOUR JOURNAL APP
// <div on:click={() => currentMode = 'Day'}
//   class="ux-tab-item hide-for-mobile" 
//   class:transparent-glow-tab={currentMode === 'Day'} 
//   style="margin-right: 8px;"
// >
//   <span on:click={() => currentMode === 'Day' ? currentMode = 'Week' : currentMode = 'Day'} class="material-symbols-outlined"
//     style="font-size: 30px; margin-top: 4px; color: black;"  
//   >
//     menu_book
//   </span>
// </div> -->

//   <div style="display: flex; gap: 24px; align-items: center;">
//     <!-- svelte-ignore a11y-click-events-have-key-events -->
//     <!-- <span on:click={() => goto(`/${$user.uid}/mobile`)} class="material-symbols-outlined mika-hover responsive-icon-size">
//     smartphone
//   </span> -->

//<div class="container-for-float-cards">
{/* <div class="glow-card-hover-effect rounded-card" style="width: 36%;">
<ZenJournalLeftNavigation
  journal={$user.journal}
  journalTitleFromMMDD={$user.journalTitleFromMMDD}
  {currentJournalEntryMMDD}
  on:toggle-music-autoplay={(e) => updateMusicAutoplay(e)}
  on:journal-entry-select={(e) =>
    (currentJournalEntryMMDD = e.detail.newMMDD)}
/>
</div> */}

