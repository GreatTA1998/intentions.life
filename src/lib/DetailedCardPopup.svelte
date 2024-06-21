<div class="fullscreen-invisible-modular-popup-layer" on:click|self={handleClickOutside} style="z-index: 10;">
  <div class="detailed-card-popup" bind:this={PopupElem}>
    {#if taskObject.imageDownloadURL}
      <img 
        bind:this={TaskImageElem}
        on:click|self={() => isViewingPhoto ? isViewingPhoto = false : ''}
        src={taskObject.imageDownloadURL}
        class:blurred-image={false}
        class:clear-image={isViewingPhoto}
        style="width: 100%; height: 100%;"
      >
    {/if}

    <div style="padding: 24px;">
      <div style="display: flex; align-items: center;">
        <ReusableCheckbox
          value={taskObject.isDone}
          on:change={(e) => handleCheckboxChange(e)}
          zoom={1.2}
        />

        <input 
          type="text" 
          bind:value={titleOfTask} 
          on:input={(e) => debouncedSaveTitle(e.target.value)}
          placeholder="Untitled"
          style="margin-left: 12px; width: 100%; box-sizing: border-box; font-size: 24px;"
        >
      </div>

      <DetailedCardPopupStartTimeDuration
        {taskObject}
        on:task-update
      />

      <div style="width: 100%; margin-top: 24px; margin-bottom: 24px;">
        <UXFormTextArea fieldLabel="Notes"
          value={notesAboutTask}
          on:input={(e) => debouncedSaveNotes(e.detail)}
          placeholder=""
        />
      </div>

      <div style="margin-top: 0px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; width: 100%;">
          {#if !taskObject.imageDownloadURL}
            <MobileDetailedCardPopupPhotoUpload {taskObject}/>
          {/if}

          <span class="material-symbols-outlined" on:click|stopPropagation={confirmDelete} 
            style="cursor: pointer; margin-left: auto; right: 0px; border: 1px solid grey; border-radius: 24px; padding: 4px;"
          >
            delete
          </span>
        </div>
      </div>

        <div style="font-size: 1rem; margin-top: 16px; margin-bottom: 12px; font-weight: 400;">
          Full ancestral tree
        </div>

        {#if taskObject.rootAncestor}
          <div style="max-height: 500px; overflow-y: auto;">
            <RecursiveBulletPoint
              taskObject={taskObject.rootAncestor}
              originalPopupTask={taskObject}
              rootAncestor={taskObject.rootAncestor}
              on:task-click
              on:task-checkbox-change
            >

            </RecursiveBulletPoint>
          </div>
        {/if}
    </div>
    <!-- End of padding container -->
  </div>
  <!-- End of detailed-card-popup -->
</div>
<!-- End of modular invisible layer -->

<script>
import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
import { mostRecentlyCompletedTaskID } from '/src/store.js'
import _ from 'lodash'
import RecursiveBulletPoint from '$lib/RecursiveBulletPoint.svelte'
import { 
  convertDDMMYYYYToDateClassObject,
  clickOutside, 
} from '/src/helpers.js'
import UXFormTextArea from '$lib/UXFormTextArea.svelte'
import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'
import ReusableCheckbox from '$lib/ReusableCheckbox.svelte'
import DetailedCardPopupStartTimeDuration from '$lib/DetailedCardPopupStartTimeDuration.svelte'
import MobileDetailedCardPopupPhotoUpload from '$lib/MobileDetailedCardPopupPhotoUpload.svelte'

export let taskObject 

let newDeadlineDate
let newDeadlineTime

let TaskImageElem
let PopupElem

$: currentDeadlineValue = (taskObject.deadlineDate || '') + (taskObject.deadlineDate && taskObject.deadlineTime ? " " : "") + (taskObject.deadlineTime || '')

const dispatch = createEventDispatcher()

// don't delete yet, as these might be needed for input element bindings
let notesAboutTask = taskObject.notes || ''
let titleOfTask = taskObject.name || ''
let isViewingPhoto = false

onMount(() => {
  if (taskObject.imageDownloadURL) {
    // solution based on Claude
    TaskImageElem.onload = () => {
      const marginFactor = 0.9
      const viewportHeight = marginFactor * window.innerHeight
      const viewportWidth = marginFactor * window.innerWidth

      const { naturalWidth, naturalHeight } = TaskImageElem

      const imageAspectRatio = naturalWidth / naturalHeight
      const viewportAspectRatio = viewportWidth / viewportHeight

      let maxWidth, maxHeight

      if (imageAspectRatio > viewportAspectRatio) {
        // Image is wider than the viewport, so scale based on width
        maxWidth = viewportWidth
        maxHeight = Math.floor(viewportWidth / imageAspectRatio)
      } else {
        // Image is taller than the viewport, so scale based on height
        maxHeight = viewportHeight
        maxWidth = Math.floor(viewportHeight * imageAspectRatio)
      }

      PopupElem.style.width = maxWidth + 'px'
      PopupElem.style.height = maxHeight + 'px'

      return { maxWidth, maxHeight }
    }
  }
})

onDestroy(() => {
  
})

// the other place to pay attention to is <RecursiveTaskElement/>
// but the idea is still the same, provide an "undo"
// for root level tasks because they disappear on completion
function handleCheckboxChange (e) {
  if (taskObject.parentID === '') {
    mostRecentlyCompletedTaskID.set(taskObject.id)
  }
  dispatch('task-checkbox-change', {
    id: taskObject.id,
    isDone: e.target.checked
  })

  dispatch('card-close')
}

const debouncedSaveTitle = _.debounce(saveTitle, 800)
const debouncedSaveNotes = _.debounce(saveNotes, 1500)

function saveDeadline (DDMMYYYY, HHMM) {
  const d1 = convertDDMMYYYYToDateClassObject(DDMMYYYY, HHMM)
  if (d1.getTime() > taskObject.subtreeDeadlineInMsElapsed) {
    alert(`Invalid deadline: a subtask's can't be due later than the overall task, which is due at ${new Date(taskObject.subtreeDeadlineInMsElapsed)}`)
    return
  }

  dispatch('task-update', { 
    id: taskObject.id, 
    keyValueChanges: {
      deadlineTime: HHMM, 
      deadlineDate: DDMMYYYY
    }
  })
  isEditingDeadline = false
}

function handleDeadlineInput (e) {
  isEditingDeadline = true
  const newVal = e.detail.value
  newDeadlineDate = newVal.split(" ")[0]
  newDeadlineTime = newVal.split(" ")[1]
}

function confirmDelete () {
  if (confirm('Are you sure you want to delete the task? This is irreversible.')) {
    dispatch('task-delete', {...taskObject})
    dispatch('card-close')
  } 
}

function handleClickOutside (e) {
  dispatch('card-close')
}

function handleInput (e) {
  debouncedSaveNotes(e.target.value)
}

function saveNotes (newVal) {
  taskObject.notes = newVal
  dispatch('task-update', { id: taskObject.id, keyValueChanges: { notes: newVal }})
}

function saveTitle (newVal) {
  dispatch('task-update', { id: taskObject.id, keyValueChanges: { name: newVal }})
}
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent;
  }

  .blurred-image {
    filter: blur(6px) brightness(1.0) contrast(1.0) saturate(1.0);  z-index: -1;
  }
  .clear-image {
    z-index: 1;
  }

  .detailed-card-popup {
    /* 
      Default sizing so mobile popup doesn't engulf the entire screen
      but doesn't affect subsequent image aspect ratio computations
        - height: fit-content; would exceed width of mobile screen 
        - max-height: 80%; would affect subsequent image dimension changes 
    */
    height: 50%;
    width: 80%;
    position: fixed;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: auto;
    z-index: 4;
    min-width: 400px;
    min-height: 400px;
    

    border-radius: 24px;
    background-color: white;
 
    /* border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  }

  /* Refer to: https://stackoverflow.com/a/3131082/7812829 */
  input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 1px solid #DBDBDD;
    outline: none;
    font-size: 23px;
    font-weight: 700;
    padding-left: 0px;
    padding-bottom: 6px;
  }


.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

a {
  flex: 1;
  background-color: #F4F4F4;
  color: #4E4E4E;
  padding-top: 8px; 
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-out;
  border: 1px solid #F4F4F4;
  font-family: sans-serif;
  font-size: 1rem;
  height: 5px;
}
</style>