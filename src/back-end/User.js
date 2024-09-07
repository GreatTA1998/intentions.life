import { db } from "./firestoreConnection";
import {
  doc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

const update = (userUID, keyValueChanges) => {
  return updateDoc(doc(db, "users", userUID), keyValueChanges).catch((err) =>
    console.error("error in User.update", err)
  );
};

const addFCMToken = (userUID, FCMToken) => {
    console.log('adding FCMToken =', FCMToken)
    return updateDoc(doc(db, "users", userUID), {
      FCMTokens: arrayUnion(FCMToken),
    }).catch((err) => console.error("error in User.update", err));
  };

export default {
  update,
  addFCMToken
};
