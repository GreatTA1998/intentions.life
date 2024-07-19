<DateInput
  bind:value={dateClassObj}
  format="MM/dd"
  closeOnSelection={true}
  placeholder="Date"
/>

<script>
  import { DateInput } from 'date-picker-svelte'
  import { getDateInMMDD, convertMMDDToDateClassObject } from '/src/helpers.js'
  import { createEventDispatcher, onMount } from 'svelte'

  export let MMDD
  export let YYYY

  let dateClassObj = initDateClassObj()

  const dispatch = createEventDispatcher()

  $: { 
    if (dateClassObj) {
      const newMMDD = getDateInMMDD(dateClassObj)
      dispatch('date-selected', {
        selectedDate: newMMDD,
        selectedYear: dateClassObj.getFullYear()
      })
    }
  }

  function initDateClassObj () {
    if (MMDD && YYYY) return convertMMDDToDateClassObject(MMDD, YYYY)
    else return null
  }
  
  function getReadableDate () {
    const [MM, DD] = MMDD.split('/')
    const monthIndex = Number(MM) - 1 // Date() constructor takes 0 - 11 month indices
    const dateStr = new Date(2020, monthIndex, DD).toDateString(); // 'Fri Apr 10 2020'
    const dateStrArr = dateStr.split(' '); // ['Fri', 'Apr', '10', '2020']
    const [dayOfWeek, month, dayOfMonth, year] = dateStr.split(' ')
    return month + ' ' + dayOfMonth
  }
</script>

<style>
  :root {
    --date-input-width: 56px;
  }
  /* 
    In general, customize the CSS with `:global()`
    https://github.com/probablykasper/date-picker-svelte/issues/14#issuecomment-1148971380 
  */
  :global(.svelte-1vabmef) {
    font-size: 16px;
  }
</style>