'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from 'react';
import { auth, db, app } from '@/utils/firestore'; // keep this as is
import { onAuthStateChanged } from "firebase/auth";
 
import { useAuth } from "@/contexts/AuthContext";

import {
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  setDoc
} from 'firebase/firestore';

export default function AdminPage() {
  const [subAdmins, setSubAdmins] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

 
 























  
  // Money provider fields
  const [providerName, setProviderName] = useState('');
  const [providerAmount, setProviderAmount] = useState('');
  const [selectedSubAdmin, setSelectedSubAdmin] = useState('');

  const fetchSubAdmins = async () => {
    const q = query(collection(db, 'admins'), where('isMain', '==', false));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSubAdmins(data);
  };

  const handleAddSubAdmin = async () => {
    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      await setDoc(doc(db, 'admins', uid), {
        email,
        isMain: false,
      });

      setEmail('');
      setPassword('');
      fetchSubAdmins();
    } catch (err) {
      alert('Failed to create sub-admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'admins', id));
      fetchSubAdmins();
    } catch (err) {
      alert('Error deleting sub-admin');
    }
  };

  const handleAddProvider = async () => {
    if (!providerName || !providerAmount || !selectedSubAdmin) {
      alert('Fill in all provider fields');
      return;
    }

    try {
      await addDoc(collection(db, 'moneyProviders'), {
        name: providerName,
        amount: parseFloat(providerAmount),
        subAdminId: selectedSubAdmin,
        addedDate: new Date().toISOString().split('T')[0],
        providedDate: null,
        status: 'unpaid',
      });

      setProviderName('');
      setProviderAmount('');
      setSelectedSubAdmin('');
      alert('Provider added!');
    } catch (err) {
      alert('Failed to add provider');
    }
  };

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
     
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          🛡️ Main Admin Panel
        </h1>

        {/* Add Sub Admin */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Add Sub-Admin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Sub-admin email"
              className="border p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            onClick={handleAddSubAdmin}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Sub-Admin'}
          </button>
        </div>

        {/* Add Money Provider */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Assign Money Provider</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Provider name"
              className="border p-2 rounded w-full"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              className="border p-2 rounded w-full"
              value={providerAmount}
              onChange={(e) => setProviderAmount(e.target.value)}
            />
            <select
              className="border p-2 rounded w-full"
              value={selectedSubAdmin}
              onChange={(e) => setSelectedSubAdmin(e.target.value)}
            >
              <option value="">Select Sub-admin</option>
              {subAdmins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.email}
                </option>
              ))}
            </select>
          </div>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
            onClick={handleAddProvider}
          >
            Assign Provider
          </button>
        </div>

        {/* Sub-admin List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sub-Admins</h2>
          {subAdmins.length === 0 ? (
            <p className="text-gray-500 text-center">No sub-admins found.</p>
          ) : (
            <ul className="divide-y">
              {subAdmins.map((admin) => (
                <li
                  key={admin.id}
                  className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
                >
                  <span className="font-medium text-gray-700">{admin.email}</span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                    onClick={() => handleDelete(admin.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
