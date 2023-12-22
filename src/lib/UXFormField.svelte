<!-- Based on UX newsletter, includes
  - Infield top-aligned form labels

  More info: https://uxmovement.substack.com/p/8-rules-for-switching-to-infield
-->
<div class="ux-form-field">
  <div class="ux-field-label">
    <slot name="icon">

    </slot>
    {fieldLabel}
  </div>

  <input 
    value={value}
    on:input={(e) => dispatch('input', { value: e.target.value })}
    on:keyup={(e) => {
      if (e.key === 'Enter') {
        dispatch('task-entered', { taskName: value })
      }
    }}
    bind:this={InputElem} 
    class="ux-input-text" 
    placeholder={placeholder}
  >
</div>

<script>
  import { onMount, createEventDispatcher } from 'svelte'

  export let fieldLabel = 'Field Label'
  export let value = ''
  export let placeholder = ''

  const dispatch = createEventDispatcher()

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

    display: flex;
    align-items: center;
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