<!--on:click|preventDefault={openMiniCalendar} -->
<input bind:this={AttachTarget}
  class="my-date-field"
  inputmode='none'
>

<script>
  import datepicker from 'js-datepicker'
  import 'js-datepicker/dist/datepicker.min.css'
  import { onMount, createEventDispatcher } from 'svelte'
  import { getDateInMMDD, convertMMDDToDateClassObject } from '/src/helpers.js'

  export let MMDD 
  export let YYYY

  let AttachTarget
  const dispatch = createEventDispatcher()
  let picker
  
  onMount(() => {
    picker = datepicker(AttachTarget, {
      onSelect: (instance, date) => {
        const newMMDD = getDateInMMDD(date)
        dispatch('date-selected', {
          selectedDate: newMMDD,
          selectedYear: date.getFullYear()
        })
      },
      formatter: (input, date, instance) => {
        const options = { month: 'short', day: 'numeric' };
        const value = date.toLocaleDateString('en-US', options)
        input.value = value // => Jul 19
      }
    })
  
    // initialize the picker to today's date
    picker.setDate(convertMMDDToDateClassObject(MMDD, YYYY), true)
  })

  function openMiniCalendar () {
    picker.show()
  }
</script>

<style>
  .my-date-field {
    height: 30px;
    border-radius: 4px;
    border: 1px solid lightgrey;
    width: 64px; 
    font-size: 16px; 
  }
</style>