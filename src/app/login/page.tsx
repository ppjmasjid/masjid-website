'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

interface UserCredential {
    user: {
        uid: string;
    };
}

interface UserDocData {
    role?: string;
}

const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
        const userCred: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCred.user;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userDocData: UserDocData | undefined = userDoc.data() as UserDocData | undefined;
        const role = userDocData?.role;

        if (role === 'main-admin') {
            router.push('/admin'); // Fixed main admin route
        } else if (role === 'sub-admin') {
            router.push(`/admin/${user.uid}`); // Dynamic route for sub-admin
        } else {
            alert('Unauthorized role');
        }
    } catch (error) {
        console.error(error);
        setError('Login failed. Check credentials.');
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
}
