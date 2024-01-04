<!-- Based on UX newsletter, includes
  - Infield top-aligned form labels

  More info: https://uxmovement.substack.com/p/8-rules-for-switching-to-infield
-->
<div class="ux-form-field"
  on:click={() => InputElem.focus()}
  class:grey-border={!isFocused}
  class:blue-border={isFocused}
>
  <div class="ux-field-label">
    <slot name="icon">

    </slot>
    {fieldLabel}
  </div>

  <input 
    bind:this={InputElem} 
    value={value}
    on:input={(e) => dispatch('input', { value: e.target.value })}
    on:keyup={(e) => {
      if (e.key === 'Enter') {
        dispatch('task-entered', { taskName: value })
      }
    }}
    on:focusin={() => isFocused = true}
    on:focusout={() => isFocused = false}
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
  let isFocused = false
</script>


<style>
  .blue-border {
    border: 2px solid #2757cf;
  }

  .grey-border {
    border: 1px solid #DBDBDD;
  }

  .ux-form-field {
    height: 68px;
    padding: 10px;
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
    width: 100%;
  }

  /* remove default input styling */
  input {
    all: unset;
  }
</style>