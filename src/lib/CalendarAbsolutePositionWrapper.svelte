<div
  style="
    position: absolute; 
    top: {calculatedTopPositionFromParent ? calculatedTopPositionFromParent : offsetFromTop}px;
    left: {offsetFromLeft}px;
  "
>
  <slot>

  </slot>
</div>

<script>
  import { computeOffset } from '/src/helpers.js'

  export let task
  export let pixelsPerHour
  export let calendarStartTime
  export let offsetFromLeft

  export let calculatedTopPositionFromParent

  $: offsetFromTop = computeOffset(task, pixelsPerHour, calendarStartTime)

</script>