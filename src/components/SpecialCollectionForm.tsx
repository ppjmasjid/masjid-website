'use client';

import { useState, useEffect } from 'react';
import { db } from '@/utils/firestore';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

interface SpecialCollectionFormProps {
  subAdminId: string;
}

interface SpecialDonor {
  id: string;
  name: string;
  amount: number;
  address: string;
  date: string;
  category: string;
  commitment?: boolean;
  isPaid?: boolean;
}

interface Category {
  id: string;
  name: string;
}

export default function SpecialCollectionForm({ subAdminId }: SpecialCollectionFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [commitment, setCommitment] = useState(false);
  const [donors, setDonors] = useState<SpecialDonor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const handleAddOrUpdate = async () => {
    if (!name || !amount || !date || !address || !category) {
      alert('All fields are required');
      return;
    }

    if (editId) {
      const confirm = prompt('To confirm edit, type donor name exactly: ' + name);
      if (confirm !== name) {
        alert('Confirmation failed. Edit cancelled.');
        return;
      }

      const ref = doc(db, 'specialCollections', editId);
      await updateDoc(ref, {
        name,
        amount: Number(amount),
        address,
        date,
        category,
        commitment,
      });
    } else {
      await addDoc(collection(db, 'specialCollections'), {
        name,
        amount: Number(amount),
        address,
        date,
        category,
        commitment,
        isPaid: !commitment, // if no commitment, mark as paid
        subAdminId,
        createdAt: Timestamp.now(),
      });
    }

    resetForm();
    fetchDonors();
  };

  const resetForm = () => {
    setName('');
    setAmount('');
    setAddress('');
    setDate('');
    setCategory('');
    setCommitment(false);
    setEditId(null);
  };

  const handleEdit = (donor: SpecialDonor) => {
    setEditId(donor.id);
    setName(donor.name);
    setAmount(donor.amount.toString());
    setAddress(donor.address);
    setDate(donor.date);
    setCategory(donor.category);
    setCommitment(!!donor.commitment);
  };

  const handleDelete = async (donor: SpecialDonor) => {
    const confirmation = prompt(`To delete, type donor name exactly: "${donor.name}"`);
    if (confirmation === donor.name) {
      await deleteDoc(doc(db, 'specialCollections', donor.id));
      fetchDonors();
    } else {
      alert('Name does not match. Deletion cancelled.');
    }
  };

  const handleConfirmPaid = async (donor: SpecialDonor) => {
    const confirmation = prompt(`Type donor name "${donor.name}" to confirm as paid`);
    if (confirmation === donor.name) {
      await updateDoc(doc(db, 'specialCollections', donor.id), {
        isPaid: true,
      });
      fetchDonors();
    } else {
      alert('Name mismatch. Payment not confirmed.');
    }
  };

  const fetchDonors = async () => {
    const q = query(collection(db, 'specialCollections'), where('subAdminId', '==', subAdminId));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      const rest = doc.data() as Omit<SpecialDonor, 'id'>;
      return {
        id: doc.id,
        ...rest,
      };
    });
    setDonors(data);
  };

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, 'specialDonationCategories'));
    const data = snapshot.docs.map((doc) => {
      const categoryData = doc.data() as Omit<Category, 'id'>;
      return {
        id: doc.id,
        ...categoryData,
      };
    });
    setCategories(data);
  };

  const exportToCSV = () => {
    const rows = [
      ['Name', 'Amount', 'Address', 'Date', 'Category', 'Commitment', 'Status'],
      ...donors.map((d) => [
        d.name,
        d.amount,
        d.address,
        d.date,
        d.category,
        d.commitment ? 'Yes' : 'No',
        d.isPaid ? 'Paid' : 'Unpaid',
      ]),
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'special_donors.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (subAdminId) {
      fetchDonors();
      fetchCategories();
    }
  }, [subAdminId]);

  const filteredDonors = filterCategory
    ? donors.filter((d) => d.category === filterCategory)
    : donors;

  return (
    <div className="max-w-4xl mx-auto p-4 text-black ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input
          type="text"
          placeholder="Donor Name"
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={commitment}
            onChange={(e) => setCommitment(e.target.checked)}
            className="w-5 h-5 text-green-600"
          />
          <span className="text-gray-700">Has Commitment</span>
        </label>
      </div>

      <button
        className={`${
          editId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
        } text-white px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-600`}
        onClick={handleAddOrUpdate}
      >
        {editId ? 'Update Donor' : 'Add Special Donor'}
      </button>

      {/* Filter */}
      <div className="mt-8 mb-4">
        <label className="mr-3 font-medium">Filter by Category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Export */}
      <button
        onClick={exportToCSV}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Export to CSV
      </button>

      {/* Previous Donors */}
      {filteredDonors.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-xl text-gray-800 mb-4">Previous Entries</h3>
          <ul className="space-y-4">
            {filteredDonors.map((donor) => (
              <li key={donor.id} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700"><strong>Name:</strong> {donor.name}</p>
                <p className="text-gray-700"><strong>Amount:</strong> ৳{donor.amount}</p>
                <p className="text-gray-700"><strong>Address:</strong> {donor.address}</p>
                <p className="text-gray-700"><strong>Date:</strong> {donor.date}</p>
                <p className="text-gray-700"><strong>Category:</strong> {donor.category}</p>
                <p className="text-gray-700"><strong>Commitment:</strong> {donor.commitment ? 'Yes' : 'No'}</p>
                {donor.commitment && !donor.isPaid && (
                  <button
                    onClick={() => handleConfirmPaid(donor)}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Confirm Paid
                  </button>
                )}
                {donor.isPaid && (
                  <p className="mt-1 text-sm text-green-700 font-semibold">✅ Paid</p>
                )}
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => handleEdit(donor)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(donor)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
