'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, db, app } from '@/utils/firestore'; // keep this as is
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from "@/contexts/AuthContext";
import AllowedYearsControl from '@/components/AllowedYearsControl';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Select from 'react-select';
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



  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<any[]>([]);











  const fetchSubAdmins = async () => {
    const q = query(collection(db, 'admins'), where('isMain', '==', false));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSubAdmins(data);
  };




  // edit catagori 
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [editName, setEditName] = useState('');
  const [editSubAdmins, setEditSubAdmins] = useState<string[]>([]);

  const handleEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setEditName(cat.name);
    setEditSubAdmins(cat.subAdminIds || []);
  };

  const handleSaveEdit = async () => {
    if (!editingCategory) return;

    await setDoc(doc(db, 'specialDonationCategories', editingCategory.id), {
      name: editName,
      subAdminIds: editSubAdmins,
    });

    setEditingCategory(null);
    fetchCategories();
  };

  //providers list 
  const [providers, setProviders] = useState<any[]>([]);
  const fetchProviders = async () => {
    const querySnapshot = await getDocs(collection(db, 'moneyProviders'));
    const rawProviders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, subAdminId: data.subAdminId || '', ...data };
    });

    const q = query(collection(db, 'admins'), where('isMain', '==', false));
    const adminSnapshot = await getDocs(q);
    const adminMap = new Map();
    adminSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      adminMap.set(doc.id, data.name);
    });

    const enrichedProviders = rawProviders.map((provider) => ({
      ...provider,
      subAdminName: adminMap.get(provider.subAdminId) || provider.subAdminId,
    }));

    setProviders(enrichedProviders);
  };

  useEffect(() => {
    fetchSubAdmins();
    fetchProviders();

  }, []);





  const handleDeleteProvider = async (id: string, name: string) => {
    const confirmation = prompt(`Type the provider's name (${name}) to confirm deletion:`);

    if (confirmation?.trim().toLowerCase() !== name.toLowerCase()) {
      alert('Confirmation failed. Provider not deleted.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'moneyProviders', id));
      fetchProviders();
      alert('Provider deleted successfully.');
    } catch (err) {
      alert('Error deleting provider.');
    }
  };




  //catagory 
  const options = subAdmins.map((admin) => ({
    value: admin.id,
    label: admin.name || admin.email,
  }));



  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, 'specialDonationCategories'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(data);
  };


  useEffect(() => {

    fetchCategories(); // new
  }, []);



  const [selectedCategorySubAdmins, setSelectedCategorySubAdmins] = useState<string[]>([]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert('Category name required.');
      return;
    }

    try {
      await addDoc(collection(db, 'specialDonationCategories'), {
        name: newCategory,
        subAdminIds: selectedCategorySubAdmins,
      });
      setNewCategory('');
      setSelectedCategorySubAdmins([]);
      fetchCategories();
      alert('Category added');
    } catch (err) {
      alert('Failed to add category');
    }
  };



  const handleDeleteCategory = async (id: string, name: string) => {
    const confirmation = prompt(`Type "${name}" to confirm deletion:`);

    if (confirmation?.trim() !== name) {
      alert('Confirmation failed.');
      return;
    }

    await deleteDoc(doc(db, 'specialDonationCategories', id));
    fetchCategories();
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
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 p-4 sm:p-6 md:p-8">
      <ProtectedRoute role="admin">
        <div className="max-w-7xl mx-auto space-y-12">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            🛡️ Main Admin Panel
          </h1>

          {/* Add Sub-Admin */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">➕ Add Sub-Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Sub-admin name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Sub-admin email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-field md:col-span-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn-primary mt-6"
              onClick={handleAddSubAdmin}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Sub-Admin'}
            </button>
          </section>

          {/* Assign Money Provider */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">💰 Assign Money Provider</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <input
                type="text"
                placeholder="Provider name"
                className="input-field"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                className="input-field"
                value={providerAmount}
                onChange={(e) => setProviderAmount(e.target.value)}
              />
              <select
                className="input-field"
                value={selectedSubAdmin}
                onChange={(e) => setSelectedSubAdmin(e.target.value)}
              >
                <option value="">Select Sub-admin</option>
                {subAdmins.map((admin) => (
                  <option key={admin.id} value={admin.id} className="text-black">
                    {admin.email}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn-secondary mt-6"
              onClick={handleAddProvider}
            >
              Assign Provider
            </button>
          </section>

          {/* Provider List */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">📄 Provider List</h2>
            {providers.length === 0 ? (
              <p className="text-gray-500 text-center">No providers found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {providers.map((provider) => (
                  <li
                    key={provider.id}
                    className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                  >
                    <span className="text-gray-700 text-sm sm:text-base">
                      Name: <strong>{provider.name}</strong> | Amount: ₹{provider.amount} | Assigned To: {provider.subAdminName}
                    </span>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteProvider(provider.id, provider.name)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Sub-Admin List */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">👥 Sub-Admins</h2>
            {subAdmins.length === 0 ? (
              <p className="text-gray-500 text-center">No sub-admins found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {subAdmins.map((admin) => (
                  <li
                    key={admin.id}
                    className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                  >
                    <span className="text-gray-700 text-sm sm:text-base">
                      Name: <strong>{admin.name}</strong> | Email: {admin.email}
                    </span>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>



          {/* Add Notice */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-red-600 mb-6">📢 Add Notice</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Title"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="date"
                className="input-field"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="input-field"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <textarea
                placeholder="Description"
                className="input-field md:col-span-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <button className="btn-secondary mt-6" onClick={handleAddNotice}>
              Add Notice
            </button>
          </section>

          {/* Notice List */}
          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">📃 All Notices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice) => (
                <div key={notice.id} className="rounded-lg border shadow p-4 bg-gray-50 hover:shadow-lg transition">
                  <img
                    src={notice.imageUrl}
                    alt={notice.title}
                    className="h-40 w-full object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-bold text-gray-800">{notice.title}</h3>
                  <p className="text-sm text-gray-500">{notice.date}</p>
                  <button
                    className="text-sm text-red-600 hover:text-red-800 mt-2"
                    onClick={() => handleDeleteNotice(notice.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
          {/* Category Management */}
          <section className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
              📁 Add Category with Sub-Admins
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter new category name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>

              <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      Select Sub-Admins
    </label>
    <Select
      isMulti
      options={options}
      value={options.filter(opt => selectedCategorySubAdmins.includes(opt.value))}
      onChange={(selectedOptions) =>
        setSelectedCategorySubAdmins(selectedOptions.map((opt) => opt.value))
      }
      className="react-select-container"
      classNamePrefix="react-select"
    />
  </div>

            </div>
            

            <div className="pt-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200"
                onClick={handleAddCategory}
              >
                ➕ Add Category
              </button>
            </div>
          </section>


          <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">📋 Categories</h2>
            {categories.length === 0 ? (
              <p className="text-gray-500">No categories added yet.</p>
            ) : (
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <div>
                        <h3 className="font-bold text-lg text-gray-700">{cat.name}</h3>
                        <p className="text-sm text-gray-600">
                          Sub-Admins: {cat.subAdminIds?.map((id: any) => {
                            const match = subAdmins.find((a) => a.id === id);
                            return match?.name || match?.email || id;
                          }).join(', ')}
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0 flex gap-2">
                        <button
                          className="btn-secondary"
                          onClick={() => handleEditCategory(cat)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          {editingCategory && (
            <div className="bg-white border border-gray-300 p-4 rounded-xl mt-6">
              <h3 className="text-lg font-semibold mb-4">Edit Category: {editingCategory.name}</h3>
              <input
                type="text"
                className="input-field mb-3"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <select
                multiple
                className="input-field h-40"
                value={editSubAdmins}
                onChange={(e) =>
                  setEditSubAdmins(Array.from(e.target.selectedOptions, (o) => o.value))
                }
              >
                {subAdmins.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.name || admin.email}
                  </option>
                ))}
              </select>
              <div className="flex gap-4 mt-4">
                <button className="btn-primary" onClick={handleSaveEdit}>Save</button>
                <button className="btn-danger" onClick={() => setEditingCategory(null)}>Cancel</button>
              </div>
            </div>
          )}


          <AllowedYearsControl />
        </div>
      </ProtectedRoute>
    </div>
  );

}
