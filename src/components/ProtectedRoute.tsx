// src/components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/utils/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({
  role,
  children,
}: {
  role: "admin" | "sub-admin";
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const ref = doc(db, "admins", user.uid);
      const snap = await getDoc(ref);
      const data = snap.data();

      if (!data) {
        // 🔄 Try users collection
        const fallbackRef = doc(db, "users", user.uid);
        const fallbackSnap = await getDoc(fallbackRef);
        const fallbackData = fallbackSnap.data();

        if (fallbackData?.role === role) {
          setAuthorized(true);
          return;
        } else {
          alert("Unauthorized role");
          router.push("/login");
          return;
        }
      }

      const isMain = data.isMain;

      if ((role === "admin" && isMain) || (role === "sub-admin" && !isMain)) {
        setAuthorized(true);
      } else {
        alert("Unauthorized role");
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [role, router]);

  return authorized ? <>{children}</> : null;
}
