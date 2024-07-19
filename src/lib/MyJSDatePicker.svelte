<input bind:this={AttachTarget}
  style="width: 100px; font-size: 16px;"
  on:click|preventDefault={openMiniCalendar}
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