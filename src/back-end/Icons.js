import { collection, addDoc, getDocs, query, where, or } from "firebase/firestore";
import { db } from "./firestoreConnection";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadString,
} from "firebase/storage";

const IconSchema = {
    dataURL: "", // to be replaced by url after storing in bucket
    name: "",
    isShareable: false,
    createdBy: "",
    tags: "",
}

async function getAvailableIcons(uid) {
    const q = query(
        collection(db, "icons"),
        or(
            where("isShareable", "==", true),
            where("createdBy", "==", uid)
        )
    );
    const querySnapshot = await getDocs(q).catch((err) => console.error("error in getAvailableIcons", err));
    return querySnapshot.docs.map((doc) => doc.data());
}

async function uploadIconDataURL(iconObject) {
    const url = await storeIconToBucket(iconObject.name, iconObject.dataURL);
    delete iconObject.dataURL;
    return addDoc(collection(db, "icons"), {
        ...iconObject,
        url,
    }).then(() => ({ ...iconObject, url })).catch((err) => console.error("error in User.addIcon", err));
}

function storeIconToBucket(name, icon) {
    const storage = getStorage();
    const iconRef = ref(storage, `icons/${name}.png`);
    return uploadString(iconRef, icon, "data_url").then((snapshot) =>
        getDownloadURL(snapshot.ref)
    ).catch((err) => console.error("error in storeIconToBucket", err));
}

export default { uploadIconDataURL, getAvailableIcons };