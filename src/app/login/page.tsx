"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getSubAdminByUsername } from "@/utils/auth"; // You need to implement this

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    // Fixed main admin credentials
    if (username === "admin" && password === "123456") {
      login({ role: "admin", username });
      router.push("/admin");
      return;
    }

    // Firebase check for sub-admin
    const subAdmin = await getSubAdminByUsername(username);
    if (subAdmin && subAdmin.password && subAdmin.password === password) {
      login({ role: "subadmin", username, id: subAdmin.id });
      router.push(`/admin/${subAdmin.id}`);
      return;
    }

    alert("Invalid credentials");
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="mb-2 border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-4 border p-2"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
