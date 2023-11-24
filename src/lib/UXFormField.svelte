<!-- Based on UX newsletter, includes
  - Infield top-aligned form labels

  More info: https://uxmovement.substack.com/p/8-rules-for-switching-to-infield
-->
<div class="ux-form-field">
  <div class="ux-field-label">
    {fieldLabel}
  </div>

  <input 
    class="ux-input-text" 
    bind:this={InputElem} 
    bind:value={modelValue}
    on:keyup={(e) => {
      if (e.key === 'Enter') {
        dispatch('task-entered', { taskName: modelValue })
      }
    }}
  >
</div>

<script>
  import { onMount, createEventDispatcher } from 'svelte'

  export let fieldLabel = 'Field Label'
  export let inputText = ''

  const dispatch = createEventDispatcher()

  let modelValue = inputText
  let InputElem

  onMount(() => {
    InputElem.focus()
  })
</script>


<style>
  .ux-form-field {
    height: 68px;
    padding: 10px;
    border: 2px solid gray;
    border-radius: 4px;
  }

  .ux-field-label {
    margin-bottom: 8px;
    font-size: 14px;
    color: gray;
  }

  .ux-input-text {
    font-weight: 500;
    font-size: 16px;
    color: black;
  }

  /* remove default input styling */
  input {
    all: unset;
  }
</style>