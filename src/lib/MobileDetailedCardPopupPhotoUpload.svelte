<span class="material-symbols-outlined"  
  on:click={() => FolderInput.click()} 
  style="cursor: pointer; margin-left: 6px; border: 1px solid grey; border-radius: 24px; padding: 4px;"
>
  add_photo_alternate
</span>

<input style="display: none;" 
  bind:this={FolderInput}
  on:change={(e) =>  handleFileChange(e)} 
  type="file" 
  accept="image/*" 
>

<script>
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
  import { updateFirestoreDoc } from '/src/crud.js'
  import { getRandomID, checkTaskObjSchema, getDateInMMDD, getTimeInHHMM } from '/src/helpers.js'
  import { user } from '/src/store.js'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  export let taskObject

  let FolderInput
  const storage = getStorage()

  async function handleFileChange (e) {
    const promises = []
    for (const imageBlobFile of e.target.files) {
      if (imageBlobFile) {
        const id = getRandomID()
        promises.push(
          uploadImageBlobToFirebase(imageBlobFile, id).then(resultSnapshot => {
            mergeImageWithTask(resultSnapshot, imageBlobFile, id)
          })
        )
      }
    }
    await Promise.all(promises)
    alert('Photos successfully uploaded.')
  }

  async function mergeImageWithTask (resultSnapshot, imageBlobFile, id) {
    const { metadata } = resultSnapshot 
    const { fullPath, timeCreated } = metadata

    // STEP 0: parallel process to retrieve width & height
    let durationForFullDisplay
    const p1 = createImageBitmap(imageBlobFile).then(bitmap => {
      const { width, height } = bitmap 
      // these durations will display fully the portrait / landscape iPhone photos on an iPad Air 1180x820
      if (width > height) durationForFullDisplay = 106
      else durationForFullDisplay = 188
    })

    // STEP 1: getDownloadURL()
    let imageDownloadURL 
    const p2 = getDownloadURL(ref(storage, fullPath)).then(url => imageDownloadURL = url)
    
    await Promise.all([p1, p2])

    // STEP 2: create a task scheduled at the same time the photo is taken
    let dateClassObj 
    if (imageBlobFile.lastModified) dateClassObj = new Date(imageBlobFile.lastModified)
    else dateClassObj = new Date(timeCreated) // otherwise we set the time to right now.

    const updateObj = {
      imageDownloadURL,
      imageFullPath: fullPath, // for easy garbage collection
      isDone: true
      // note we do NOT change the task's timing based on the photo
    }

    // only auto-hydrate the time if the task isn't already on the calendar
    if (!taskObject.startDate) { 
      updateObj.startTime = getTimeInHHMM({ dateClassObj })
      updateObj.startDate = getDateInMMDD(dateClassObj)
      updateObj.startYYYY = `${dateClassObj.getFullYear()}`
      updateObj.duration = durationForFullDisplay
    }

    updateFirestoreDoc(`/users/${$user.uid}/tasks/${taskObject.id}`, updateObj)
  }

  async function uploadImageBlobToFirebase (blobFile, id) {
    return new Promise(async (resolve) => {
      const storageRef = ref(storage, `images/${id}`)
      const snapshot = await uploadBytes(storageRef, blobFile)
      console.log('Uploaded a blob or file! =', snapshot);
      resolve(snapshot)
    })
  }
</script>