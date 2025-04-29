'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, db, app } from '@/utils/firestore'; // keep this as is
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from "@/contexts/AuthContext";

import { createUserWithEmailAndPassword } from 'firebase/auth';
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
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [providerName, setProviderName] = useState('');
  const [providerAmount, setProviderAmount] = useState('');
  const [selectedSubAdmin, setSelectedSubAdmin] = useState('');

  const fetchSubAdmins = async () => {
    const q = query(collection(db, 'admins'), where('isMain', '==', false));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSubAdmins(data);
  };







  // notice start 
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [notices, setNotices] = useState<any[]>([]);



  // Add this above your component
const imgbbAPIKey = '40e58544cb5b668e512765223d0f98eb'; // Replace with your real API key

// Add this to state
const [imageFile, setImageFile] = useState<File | null>(null);

const handleAddNotice = async () => {
  if (!title || !date || !description || !imageFile) {
    alert("Fill all fields and upload an image.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
      method: "POST",
      body: formData,
    });

    const imgData = await res.json();
    const uploadedImageUrl = imgData.data.url;

    await addDoc(collection(db, "notices"), {
      title,
      date,
      imageUrl: uploadedImageUrl,
      description,
    });

    setTitle('');
    setDate('');
    setImageFile(null);
    setDescription('');
    fetchNotices();
    alert("Notice added");
  } catch (err) {
    console.error(err);
    alert("Failed to upload image or add notice");
  }
};


  const handleDeleteNotice = async (id: string) => {
    if (confirm("Delete this notice?")) {
      await deleteDoc(doc(db, "notices", id));
      fetchNotices();
    }
  };

  const fetchNotices = async () => {
    const querySnapshot = await getDocs(collection(db, 'notices'));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setNotices(data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);


  // notice end
  const handleAddSubAdmin = async () => {
    const confirmation = prompt(`Type the sub-admin's email (${email}) to confirm creation:`);

    if (confirmation?.trim().toLowerCase() !== email.trim().toLowerCase()) {
      alert('Confirmation failed. Sub-admin not created.');
      return;
    }

    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      await setDoc(doc(db, 'admins', uid), { email, name, isMain: false });
      await setDoc(doc(db, 'users', uid), { email, name, role: 'sub-admin' });

      setEmail('');
      setPassword('');
      setName('');
      await fetchSubAdmins();
      alert('Sub-admin created successfully.');
    } catch (err) {
      alert('Failed to create sub-admin.');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    const admin = subAdmins.find((a) => a.id === id);
    const confirmation = prompt(`Type the sub-admin's email (${admin?.email}) to confirm deletion:`);

    if (confirmation?.trim().toLowerCase() !== admin?.email.trim().toLowerCase()) {
      alert('Confirmation failed. Sub-admin not deleted.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'admins', id));
      await deleteDoc(doc(db, 'users', id));
      await fetchSubAdmins();
      alert('Sub-admin deleted.');
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <ProtectedRoute role="admin">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            🛡️ Main Admin Panel
          </h1>

          {/* Add Sub-Admin */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Add Sub-Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Sub-admin name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-500 placeholder-gray-500 border"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Sub-admin email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-500  text-gray-500 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-500 placeholder-gray-500 border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition"
              onClick={handleAddSubAdmin}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Sub-Admin'}
            </button>
          </div>

          {/* Assign Money Provider */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">Assign Money Provider</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Provider name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 text-gray-500 placeholder-gray-500 border"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 text-gray-500 placeholder-gray-500 border"
                value={providerAmount}
                onChange={(e) => setProviderAmount(e.target.value)}
              />
              <select
                className="w-full color-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 text-gray-500 placeholder-gray-500 border"
                value={selectedSubAdmin}
                onChange={(e) => setSelectedSubAdmin(e.target.value)}
              >
                <option value="">Select Sub-admin</option>
                {subAdmins.map((admin) => (
                  <option key={admin.id} value={admin.id} className='text-black'>
                    {admin.email}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
              onClick={handleAddProvider}
            >
              Assign Provider
            </button>
          </div>

          {/* Sub-Admin List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sub-Admins</h2>
            {subAdmins.length === 0 ? (
              <p className="text-gray-500 text-center">No sub-admins found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {subAdmins.map((admin) => (
                  <li
                    key={admin.id}
                    className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                  >
                    <span className="text-gray-700">Name:{admin.name}   |  Email:{admin.email}</span>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Add Notice */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Add Notice</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="px-4 py-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="date"
                className="px-4 py-2 border rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
  type="file"
  accept="image/*"
  className="px-4 py-2 border rounded"
  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
/>

              <textarea
                placeholder="Description"
                className="col-span-2 px-4 py-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
              onClick={handleAddNotice}
            >
              Add Notice
            </button>
          </div>

          {/* Notice List */}
          <div className="bg-white mt-8 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Notices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notices.map((notice) => (
                <div key={notice.id} className="border p-4 rounded shadow">
                  <img src={notice.imageUrl} className="h-40 w-full object-cover rounded mb-2" />
                  <h3 className="text-lg font-bold">{notice.title}</h3>
                  <p className="text-sm text-gray-500">{notice.date}</p>
                  <button
                    className="text-red-600 mt-2 text-sm"
                    onClick={() => handleDeleteNotice(notice.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>


        </div>
      </ProtectedRoute>
    </div>
  );
}
