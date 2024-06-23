<div on:click={manualClick} style="border: 1px solid lightgrey; padding: 4px 6px; border-radius: 4px;">
  {getReadableDate(MMDD)}
</div>

<input type="date" name="dateofbirth" id="dateofbirth" style="width: 24px; height: 24px;"
  on:input={(e) => handleInput(e)}
>

<script>
  import { createEventDispatcher } from "svelte";

  export let MMDD

  let isShowingDatePicker = false

  const dispatch = createEventDispatcher()

  function getReadableDate () {
    const [MM, DD] = MMDD.split('/')

    const dateStr = new Date(2020, MM, DD).toDateString(); // 'Fri Apr 10 2020'
    const dateStrArr = dateStr.split(' '); // ['Fri', 'Apr', '10', '2020']
    const [dayOfWeek, month, dayOfMonth, year] = dateStr.split(' ')
    console.log(dateStrArr[1], dateStrArr[2]); // 'Apr'
    return month + ' ' + dayOfMonth
  }

  function handleInput (e) {
    const [yyyy, mm, dd] = e.target.value.split('-')
    dispatch('date-selected', { selectedDate: mm + '/' + dd })
  }

  function manualClick () {
    const DateInput = document.getElementById('dateofbirth')

    // https://stackoverflow.com/a/70937790/7812829
    DateInput.showPicker()

    isShowingDatePicker = true
  }
</script>
