import { deleteObject, getStorage, ref } from "firebase/storage";

export async function deleteImage ({ imageFullPath }) {
  const storage = getStorage()
  await deleteObject(ref(storage, imageFullPath))
  console.log('successfully deleted')
}
