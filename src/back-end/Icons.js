import { collection, getDocs, query, where, or, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./firestoreConnection";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadString,
    deleteObject
} from "firebase/storage";
import { update } from "lodash";

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
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

async function uploadIconDataURL(iconObject) {
    const url = await storeIconToBucket(iconObject.id, iconObject.dataURL);
    delete iconObject.dataURL;
    return setDoc(doc(db, "icons", iconObject.id), {
        ...iconObject,
        url,
    }).then(() => ({ ...iconObject, url })).catch((err) => console.error("error in User.addIcon", err));
}

async function deleteRecursively({ id, uid, url }) {
    console.log("deleting", id, uid, url);
    const storage = getStorage();
    const iconRef = ref(storage, `icons/${id}.png`);
    await deleteObject(iconRef);
    await deleteDoc(doc(db, "icons", id));
    deleteIconsFromPeriodicTasks({ uid, url });
    deleteIconsFromTasks({ uid, url });
    return true;
}


function storeIconToBucket(id, icon) {
    const storage = getStorage();
    const iconRef = ref(storage, `icons/${id}.png`);
    return uploadString(iconRef, icon, "data_url").then((snapshot) =>
        getDownloadURL(snapshot.ref)
    ).catch((err) => console.error("error in storeIconToBucket", err));
}

async function deleteIconsFromPeriodicTasks({ uid, url }) {
    const periodicRef = collection(db, 'users', uid, "periodicTasks");
    const q = query(periodicRef, where("iconUrl", "==", url));  
    const periodicTasks = await getDocs(q);
    if (!periodicTasks.length) return;
    for (const task of periodicTasks) {
        updateDoc(task, {
            iconUrl: "",
        });
    }
}
async function deleteIconsFromTasks({ uid, url }) {
    const tasksRef = collection(db, 'users', uid, "tasks");
    const q = query(tasksRef, where("iconUrl", "==", url));
    const tasks = await getDocs(q);
    if (!tasks.length) return;
    for (const task of tasks) {
        updateDoc(task, {
            iconUrl: "",
        });
    }
}

export default { uploadIconDataURL, getAvailableIcons, deleteRecursively };