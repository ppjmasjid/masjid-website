import { getDoc, doc } from "firebase/firestore";
import { db } from "./firestore";

export const getSubAdminByUsername = async (username: string) => {
  const ref = doc(db, "subadmins", username);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { id: username, ...snap.data() };
  }
  return null;
};