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