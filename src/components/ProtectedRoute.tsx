'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({
  role,
  children,
}: {
  role: "admin" | "sub-admin";
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user === undefined) return; // wait for auth load

    if (!user) {
      router.push("/login"); // not logged in
    } else if (user.role !== role) {
      router.push("/login"); // wrong role
    } else {
      setIsChecking(false); // success
    }
  }, [user, role, router]);

  if (isChecking) return null; // don't render anything until auth is checked

  return <>{children}</>;
}
