<div style="padding: 6px; background-color: white; display: flex; align-items: center; justify-content: center; height: 100vh">
  <div>
    <div style="height: 360px; width: 360px; display: flex; align-items: center; justify-content: center; background-color: var(--navbar-bg-color); border-radius: 180px; margin-bottom: 16px;">
      <span on:click={openCameraInput} class="material-symbols-outlined" style="font-size: 300px; font-weight: 200; cursor: pointer; color: var(--logo-twig-color)">
        photo_camera
      </span>
    </div>

    <div style="font-size: 14px; margin-bottom: 12px; text-align: center;">
      Tip: add this page to your phone's homescreen
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
        <div on:click={openFolderInput} class="circular-icon-button">
          <span class="material-symbols-outlined" style="font-size: 34px; cursor: pointer; color: rgb(20, 20, 20);">
            photo_library
          </span>
        </div>

        <input style="display: none;" 
          bind:this={FolderInput}
          on:change={(e) =>  handleFileChange(e)} 
          multiple
          type="file" 
          accept="image/*" 
        >
      </div>


      <div class="circular-icon-button" style="background-color: transparent;" on:click={() => goto(`/${$user.uid}`)}>
        <span class="material-symbols-outlined" style="font-size: 34px; cursor: pointer; color: rgb(120, 120, 120);">
          undo
        </span>
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

  const storage = getStorage()

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
    const promises = []
    for (const imageBlobFile of e.target.files) {
      if (imageBlobFile) {
        const id = getRandomID()
        promises.push(
          uploadImageBlobToFirebase(imageBlobFile, id).then(resultSnapshot => {
            createNewScheduledTaskContainingImage(resultSnapshot, imageBlobFile, id)
          })
        )
      }
    }
    await Promise.all(promises)
    alert('Photos successfully uploaded.')
  }

  async function uploadImageBlobToFirebase (blobFile, id) {
    return new Promise(async (resolve) => {
      const storageRef = ref(storage, `images/${id}`)
      const snapshot = await uploadBytes(storageRef, blobFile)
      console.log('Uploaded a blob or file! =', snapshot);
      resolve(snapshot)
    })
  }

  async function createNewScheduledTaskContainingImage (resultSnapshot, imageBlobFile, id) {
    console.log('resultSnapshot =', resultSnapshot)

    const { metadata } = resultSnapshot 
    const { fullPath, timeCreated } = metadata

    // STEP 0: parallel process to retrieve width & height
    let durationForFullDisplay
    const p1 = createImageBitmap(imageBlobFile).then(bitmap => {
      const { width, height } = bitmap 
      // these durations will display fully the portrait / landscape iPhone photos on an iPad Air 1180x820
      if (width > height) durationForFullDisplay = 68
      else durationForFullDisplay = 120
      console.log("durationForFullDisplay =", durationForFullDisplay)
    })

    // STEP 1: getDownloadURL()
    let imageDownloadURL 
    const p2 = getDownloadURL(ref(storage, fullPath)).then(url => imageDownloadURL = url)
    
    await Promise.all([p1, p2])

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
      startYYYY: `${dateClassObj.getFullYear()}`, // year needs to be a string for some reason
      duration: durationForFullDisplay
    }
    newTaskObj = checkTaskObjSchema(newTaskObj, $user)

    await setFirestoreDoc(
      `users/${$user.uid}/tasks/${id}`, 
      newTaskObj
    )  
  }
</script>

<style>
  .circular-icon-button {
    background-color: var(--navbar-bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    width: 60px;
    height: 60px;
  }

</style>