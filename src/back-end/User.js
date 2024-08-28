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

const addFMCToken = (userUID, FMCToken) => {
    return updateDoc(doc(db, "users", userUID), {
      FMCTokens: arrayUnion(FMCToken),
    }).catch((err) => console.error("error in User.update", err));
  };

export default {
  update,
  addFMCToken
};
