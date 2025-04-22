'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firestore';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CreateMainAdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Add to Firestore with isMain = true
      await setDoc(doc(db, 'admins', uid), {
        isMain: true,
        email,
        createdAt: new Date().toISOString(),
      });

      setSuccessMsg('✅ Main admin created successfully!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setErrorMsg(`❌ ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <ProtectedRoute role="admin">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded shadow max-w-md w-full">
          <h1 className="text-xl font-bold mb-4">Create New Main Admin</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                className="border rounded w-full p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                className="border rounded w-full p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              {loading ? 'Creating...' : 'Create Main Admin'}
            </button>
          </form>

          {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}
        </div>
      </div>
    </ProtectedRoute>
  );
}
