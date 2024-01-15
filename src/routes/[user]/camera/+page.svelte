<div style="padding: 12px;">
  <input on:change={(e) =>  handleFileChange(e)} type="file" accept="image/*" capture>

  <div style="font-weight: 300; font-size: 14px; margin-top: 24px;">
    Tip: Put this URL as your home icon on your iPhone
  </div>
  <div style="font-weight: 500; font-size: 16px;">
    Take a picture / upload a picture. When the photo uploads to the calendar, this page will reload.
  </div>
</div>

<script>
  import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
  import { setFirestoreDoc } from '/src/crud.js'
  import { getRandomID, checkTaskObjSchema, getDateInMMDD, getTimeInHHMM } from '/src/helpers.js'
  import { user } from '/src/store.js'

  const storage = getStorage()
  const id = getRandomID()

  async function handleFileChange (e) {
    const imageBlobFile = e.target.files[0]
    if (imageBlobFile) {
      console.log("imageBlobFile =", imageBlobFile)
      const resultSnapshot = await uploadImageBlobToFirebase(imageBlobFile)
      await createNewScheduledTaskContainingImage(resultSnapshot)
      window.location.reload()
    }
  }

  async function uploadImageBlobToFirebase (blobFile) {
    return new Promise(async (resolve) => {
      const storageRef = ref(storage, `images/${id}`)
      console.log("initiating upload()")
      const snapshot = await uploadBytes(storageRef, blobFile)
      console.log('Uploaded a blob or file! =', snapshot);
      resolve(snapshot)
    })
  }

  async function createNewScheduledTaskContainingImage (resultSnapshot) {
    console.log('resultSnapshot =', resultSnapshot)

    const { metadata } = resultSnapshot 
    const { fullPath, timeCreated } = metadata

    // STEP 1: getDownloadURL()
    const imageDownloadURL = await getDownloadURL(ref(storage, fullPath))
    console.log("imageDownloadURL =", imageDownloadURL)

    // STEP 2: create a task scheduled at the same time with the imageDownloadURL
    const dateClassObj = new Date(timeCreated)
    let newTaskObj = {
      id, 
      name: `Photo ${getTimeInHHMM({ dateClassObj })}`,
      imageDownloadURL,
      startTime: getTimeInHHMM({ dateClassObj }),
      startDate: getDateInMMDD(dateClassObj), // MMDD is a legacy function so doesn't use destructuring
      duration: 60
    }
    newTaskObj = checkTaskObjSchema(newTaskObj, $user)
    console.log('newTaskObj =', newTaskObj)

    await setFirestoreDoc(
      `users/${$user.uid}/tasks/${id}`, 
      newTaskObj
    )  
  }
</script>