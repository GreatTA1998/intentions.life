<slot {ourReactiveState}>

</slot>

<script>
  import { tasksScheduledOn } from "/src/store.js"

  export let dateClassObj 

  let ourReactiveState

  $: if ($tasksScheduledOn) {
    ourReactiveState = getScheduledTasks(dateClassObj).filter(task => task.startTime) 
  }

  function getScheduledTasks (dateClassObj) {
    const simpleISO = getSimpleISOFromDateClassObj(dateClassObj)
    return $tasksScheduledOn[simpleISO] || [] // `tasksScheduledOn` will only use
  }

  // dd-mm-yyyy format
  function getSimpleISOFromDateClassObj (d) {
    let dd = d.getDate()
    let mm = d.getMonth() + 1
    let yyyy = d.getFullYear()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    return dd + '-' + mm + '-' + yyyy;
  }
</script>