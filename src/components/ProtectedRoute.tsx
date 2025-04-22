// src/components/ProtectedRoute.tsx
"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/utils/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, role }: { children: React.ReactNode; role: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        if (userData?.role !== role) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
