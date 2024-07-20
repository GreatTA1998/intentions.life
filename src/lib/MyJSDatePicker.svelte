
<!-- To prevent the iOS keyboard from showing 
     inputmode='none'
     https://stackoverflow.com/a/65358992/7812829 
-->
<input bind:this={AttachTarget}
  class="my-date-field"
  inputmode='none'
  readonly
>

<script>
  import 'js-datepicker/dist/datepicker.min.css'
  import { onMount, createEventDispatcher } from 'svelte'
  import { getDateInMMDD, convertMMDDToDateClassObject } from '/src/helpers.js'

  export let MMDD 
  export let YYYY

  let AttachTarget
  const dispatch = createEventDispatcher()
  let picker
  
  onMount(async () => {
    const datepicker = await import('js-datepicker')

    picker = datepicker.default(AttachTarget, {
      onSelect: (instance, date) => {
        if (date) {// sometimes `date` is undefined after selection for some reason
          const newMMDD = getDateInMMDD(date)
          dispatch('date-selected', {
            selectedDate: newMMDD,
            selectedYear: date.getFullYear()
          })
        }
      },
      formatter: (input, date, instance) => {
        const options = { month: 'short', day: 'numeric' };
        const value = date.toLocaleDateString('en-US', options)
        input.value = value // => Jul 19
      }
    })
  
    // initialize the picker to today's date
    if (MMDD && YYYY) {
      picker.setDate(convertMMDDToDateClassObject(MMDD, YYYY), true)
    }
  })
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