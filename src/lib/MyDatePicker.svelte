<div on:click={manualClick} style="border: 1px solid lightgrey; padding: 4px 6px; border-radius: 4px;">
  {getReadableDate(MMDD)}
</div>

<input type="date" name="dateofbirth" id="dateofbirth" style="width: 1px; height: 1px; opacity: 0;"
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

<style>
  [type="date"] {
    background:#ffffff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)  97% 50% no-repeat ;
  }
  [type="date"]::-webkit-inner-spin-button {
    display: none;
  }
  [type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  input {
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    background-color: #fff;
    padding: 3px 5px;
    box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
    width: 120px;
  }
</style>