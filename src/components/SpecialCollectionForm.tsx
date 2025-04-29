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
}

export default function SpecialCollectionForm({ subAdminId }: SpecialCollectionFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [donors, setDonors] = useState<SpecialDonor[]>([]);

  const handleAdd = async () => {
    if (!name || !amount || !date || !address) {
      alert('All fields are required');
      return;
    }

    const docRef = await addDoc(collection(db, 'specialCollections'), {
      name,
      amount: Number(amount),
      date,
      address,
      subAdminId,
      createdAt: Timestamp.now(),
    });

    setName('');
    setAmount('');
    setAddress('');
    setDate('');
    fetchDonors();
  };

  const fetchDonors = async () => {
    const q = query(collection(db, 'specialCollections'), where('subAdminId', '==', subAdminId));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SpecialDonor[];
    setDonors(data);
  };

  useEffect(() => {
    if (subAdminId) fetchDonors();
  }, [subAdminId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Donor Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleAdd}
      >
        Add Special Donor
      </button>

      {donors.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Previous Entries</h3>
          <ul className="divide-y">
            {donors.map((donor) => (
              <li key={donor.id} className="py-3">
                <p><strong>Name:</strong> {donor.name}</p>
                <p><strong>Amount:</strong> ৳{donor.amount}</p>
                <p><strong>Address:</strong> {donor.address}</p>
                <p><strong>Date:</strong> {donor.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
