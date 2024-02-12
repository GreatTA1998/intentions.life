<div style="padding: 6px; background-color: var(--navbar-bg-color); display: flex; align-items: center; justify-content: center; height: 100vh">
  <div>
    <div style="height: 360px; width: 360px; display: flex; align-items: center; justify-content: center; background-color: var(--todo-list-bg-color); border-radius: 180px; margin-bottom: 24px;">
      <span on:click={openCameraInput} class="material-symbols-outlined" style="font-size: 300px; font-weight: 200; cursor: pointer; color: var(--logo-twig-color)">
        photo_camera
      </span>
    </div>

    <input style="display: none;" 
      bind:this={CameraInput}
      on:change={(e) =>  handleFileChange(e)} 
      type="file" 
      accept="image/*" 
      capture
    >

    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex; justify-content: center;">
        <ReusableRoundButton on:click={openFolderInput} backgroundColor="var(--todo-list-bg-color)" textColor="rgb(80, 80, 80)">
          <span class="material-symbols-outlined" style="font-size: 18px; cursor: pointer; margin-right: 4px; color: rgb(80, 80, 80);">
            folder
          </span>
          <div style="font-size: 12px;">
            Upload photos
          </div>
        </ReusableRoundButton>

        <input style="display: none;" 
          bind:this={FolderInput}
          on:change={(e) =>  handleFileChange(e)} 
          multiple
          type="file" 
          accept="image/*" 
        >
      </div>

      <div style="display: flex; justify-content: center;">
        <ReusableRoundButton on:click={() => goto(`/${$user.uid}`)} backgroundColor="var(--todo-list-bg-color)" textColor="rgb(80, 80, 80)">
          <span class="material-symbols-outlined" style="font-size: 18px; cursor: pointer; margin-right: 4px; color: rgb(80, 80, 80);">
            calendar_month
          </span>
          <div style="font-size: 12px;">
            Back to calendar
          </div>
        </ReusableRoundButton>
      </div>
    </div>
  </div>
</div>

<script>
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
  import { setFirestoreDoc } from '/src/crud.js'
  import { getRandomID, checkTaskObjSchema, getDateInMMDD, getTimeInHHMM } from '/src/helpers.js'
  import { user } from '/src/store.js'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import ReusableRoundButton from '$lib/ReusableRoundButton.svelte'

  const storage = getStorage()
  const id = getRandomID()

  let CameraInput
  let FolderInput

  onMount(() => {

  })

  function openCameraInput () {
    CameraInput.click()
  }

  function openFolderInput () {
    FolderInput.click()
  }

  async function handleFileChange (e) {
    for (const imageBlobFile of e.target.files) {
      if (imageBlobFile) {
        console.log("imageBlobFile =", imageBlobFile)
        const resultSnapshot = await uploadImageBlobToFirebase(imageBlobFile)
        await createNewScheduledTaskContainingImage(resultSnapshot, imageBlobFile)
      }
    }
  }

  async function uploadImageBlobToFirebase (blobFile) {
    return new Promise(async (resolve) => {
      const storageRef = ref(storage, `images/${id}`)
      const snapshot = await uploadBytes(storageRef, blobFile)
      console.log('Uploaded a blob or file! =', snapshot);
      resolve(snapshot)
    })
  }

  async function createNewScheduledTaskContainingImage (resultSnapshot, imageBlobFile) {
    console.log('resultSnapshot =', resultSnapshot)

    const { metadata } = resultSnapshot 
    const { fullPath, timeCreated } = metadata

    // STEP 1: getDownloadURL()
    const imageDownloadURL = await getDownloadURL(ref(storage, fullPath))

    // STEP 2: create a task scheduled at the same time the photo is taken
    let dateClassObj 
    if (imageBlobFile.lastModified) dateClassObj = new Date(imageBlobFile.lastModified)
    else dateClassObj = new Date(timeCreated) // otherwise we set the time to right now.

    let newTaskObj = {
      id, 
      name: `Photo ${getTimeInHHMM({ dateClassObj })}`,
      imageDownloadURL,
      imageFullPath: fullPath, // for easy garbage collection
      startTime: getTimeInHHMM({ dateClassObj }),
      startDate: getDateInMMDD(dateClassObj), // MMDD is a legacy function so doesn't use destructuring
      startYYYY: dateClassObj.getFullYear(),
      duration: 120
    }
    newTaskObj = checkTaskObjSchema(newTaskObj, $user)
    console.log('newTaskObj =', newTaskObj)

    await setFirestoreDoc(
      `users/${$user.uid}/tasks/${id}`, 
      newTaskObj
    )  
  }
</script>

<style>

</style>