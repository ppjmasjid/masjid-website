import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {app }from "@/utils/firestore";

const auth = getAuth(app);

export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};
