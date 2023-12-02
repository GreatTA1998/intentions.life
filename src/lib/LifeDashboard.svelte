<div style="background-color: transparent; width: 100%; display: flex; justify-content: space-between; padding: 24px;">
  <!-- 
    You want to preserve all the tasks created with the template. 
    Then choose to only display tasks that had a startDate that was before the first week.

    HOW TO CODE: 
      - Goals are editable rather than hard-coded
      - How do you create templates? Create template button (based on an existing task for now)
      - Display the data on time spent
      - Done.
  -->

  <!-- specifically articulated vision with deadline and how-to-achieve, but no need to keep track of progress for now -->
  <div class="rounded-card">
    <div style="text-transform: uppercase; color: rgb(40, 40, 40);">
      GOALS
    </div>

    <div style="margin-bottom: 24px;"></div>
    
    <input class="section-title" bind:value={myGoal1}>
  
    <div style="margin-top: 6px;"></div>
    <textarea class="reset-textarea section-description" style="font-weight: 400; width: 100%; height: 100px;" bind:value={myGoal1Description}/>

    <div style="margin-bottom: 24px;"></div>

    <input class="section-title" bind:value={myGoal2}>

    <div style="margin-top: 6px;"></div>
    <textarea class="reset-textarea section-description" style="font-weight: 400; width: 100%; height: 100px;" bind:value={myGoal2Description}/>
  </div>

  <div class="rounded-card">
    <div style="display: flex; align-items: center;">
    <div style="text-transform: uppercase; color: rgb(40, 40, 40);">
      TIME SPENT
    </div>
      <div style="font-size: 14px; margin-left: 8px;">
        this week
      </div>
    </div>

    <div style="margin-top: 24px;"></div>

    {#each templatedTasksThisWeek as templateTask}
      <div style="font-weight: 600; font-size: 24px;">
        {templateTask.hourDuration} hr
      </div>
      <div style="font-weight: 400;">
        {templateTask.name}
      </div>
      <div style="background: green; border-radius: 4px; width: {templateTask.hourDuration * 48}px; height: 8px; margin-top: 4px; margin-bottom: 24px;"></div>
    {/each}
  </div>
</div>

<script>
  let myGoal1 = 'Hit $100 monthly revenue'
  let myGoal1Description = 'By launching a compelling product to universities and the internet'

  let myGoal2 = 'An intimidating girlfriend'
  let myGoal2Description = 'Pretty, articulate, emotionally mature with compatible fun hobbies. I will achieve this by becoming fluent in 3 languages, cultivating good male friendships and becoming a dangerous person.'

  let templatedTasksThisWeek = [
    { name: 'Twitch', hourDuration: 3, frequency: 4},
    { name: 'Life Organizer', hourDuration: 2, frequency: 3},
    { name: 'Meditate', hourDuration: 0.5, frequency: 7}
  ]

  // write a general debounce function that lets you update a particular user property to a new value
  // call it debouncedUpdateUserDoc ({ propertyName, newValue })
</script>

<style>
  .rounded-card {
    border-radius: 40px; 
    width: 460px; 
    height: 640px; 
    padding: 24px;
    border: 2px solid grey;
  }

  .section-title {
    font-weight: 600;
    font-size: 20px;
  }

  .section-description {
    font-size: 16px;
    font-weight: 400;
  }

  input {
    all: unset;
  }
</style>