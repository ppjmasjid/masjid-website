"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/utils/firestore";
import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("mosque-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;

        // Check users collection first
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const fullUser = {
            uid,
            email: firebaseUser.email,
            role: userData.role,
          };
          setUser(fullUser);
          localStorage.setItem("mosque-user", JSON.stringify(fullUser));
          return;
        }

        // Check admins collection fallback
        const adminRef = doc(db, "admins", uid);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
          const adminData = adminSnap.data();
          const role = adminData?.isMain ? "admin" : "sub-admin";
          const fullUser = {
            uid,
            email: firebaseUser.email,
            role,
          };
          setUser(fullUser);
          localStorage.setItem("mosque-user", JSON.stringify(fullUser));
          return;
        }

        // If no role found
        alert("Role not defined. Contact system admin.");
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("mosque-user");
      } else {
        setUser(null);
        localStorage.removeItem("mosque-user");
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("mosque-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
