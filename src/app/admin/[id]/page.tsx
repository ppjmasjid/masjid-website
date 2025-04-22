'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/utils/firestore';

interface Provider {
  id: string;
  name: string;
  amount: number;
  addedDate: string;
  providedDate?: string | null;
  status: 'paid' | 'unpaid';
}

export default function SubAdminPanel() {
  const { id } = useParams(); // sub-admin UID
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providedDates, setProvidedDates] = useState<{ [key: string]: string }>({});


















  const fetchProviders = async () => {
    const q = query(collection(db, 'moneyProviders'), where('subAdminId', '==', id));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Provider[];
    setProviders(data);
  };

  const handleConfirm = async (providerId: string) => {
    const date = providedDates[providerId];
    if (!date) {
      alert('Please select a provided date');
      return;
    }

    const ref = doc(db, 'moneyProviders', providerId);
    await updateDoc(ref, {
      providedDate: date,
      status: 'paid',
    });

    alert('Confirmed!');
    fetchProviders();
  };

  useEffect(() => {
    if (id) fetchProviders();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Sub-Admin Panel</h1>
        <p className="mb-4 text-gray-600">User ID: <code>{id}</code></p>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Assigned Money Providers</h2>

          {providers.length === 0 ? (
            <p className="text-gray-500">No assigned providers yet.</p>
          ) : (
            <ul className="divide-y">
              {providers.map((provider) => (
                <li key={provider.id} className="py-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <p className="font-medium text-lg">{provider.name}</p>
                      <p className="text-gray-600 text-sm">৳ {provider.amount}</p>
                      <p className="text-gray-500 text-sm">Added: {provider.addedDate}</p>
                      <p className="text-sm">
                        Status: <span className={`font-semibold ${provider.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                          {provider.status}
                        </span>
                      </p>
                      {provider.status === 'paid' && provider.providedDate && (
                        <p className="text-sm text-gray-500">Paid on: {provider.providedDate}</p>
                      )}
                    </div>

                    {provider.status === 'unpaid' && (
                      <div className="space-y-2">
                        <input
                          type="date"
                          className="border p-2 rounded w-full"
                          value={providedDates[provider.id] || ''}
                          onChange={(e) =>
                            setProvidedDates((prev) => ({ ...prev, [provider.id]: e.target.value }))
                          }
                        />
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                          onClick={() => handleConfirm(provider.id)}
                        >
                          Confirm Payment
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
