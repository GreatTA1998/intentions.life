import db from "./connection.js";
import {
  writeBatch,
  doc,
  getDocs,
  collection,
  query,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";





async function uploadIconsToStorage() {
  const q = query(collection(db, "/doodleIcons"));
  const querySnapshot = await getDocs(q);
  await Promise.all(
    ...querySnapshot.docs.map((doc) =>
      storeIconToBucket(doc.id, doc.data().dataURL)
    )
  ).catch((err) => console.error("error in store In Bucket", err));
}

async function storeIconToBucket(name, icon) {
  const storage = getStorage();
  const iconRef = ref(storage, `icons/${name}.png`);
  uploadString(iconRef, icon, "data_url").then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {});
  });
}
// const getImage = async () => {
//   const storage = getStorage();
//   const url = await getDownloadURL(
//     ref(storage, "gs://project-y-2a061.appspot.com/icons/download.png")
//   );
//   console.log(url);
// };
// getImage();
