'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import SpecialCollectionForm from '@/components/SpecialCollectionForm';

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/utils/firestore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Provider {
  id: string;
  name: string;
  amount: number;
  addedDate: string;
  statusByMonth: {
    [period: string]: {
      status: 'paid' | 'unpaid';
      providedDate?: string;
    };
  };
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generatePeriodOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];
  const options: string[] = [];
  years.forEach((year) => {
    months.forEach((month) => {
      options.push(`${month}${year}`);
    });
  });
  return options;
};

export default function SubAdminPanel() {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState<'regular' | 'special'>('regular');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providedDates, setProvidedDates] = useState<{ [key: string]: string }>({});
  const [selectedPeriod, setSelectedPeriod] = useState<string>(() => {
    const now = new Date();
    return `${months[now.getMonth()]}${now.getFullYear()}`;
  });

  const fetchProviders = async () => {
    const q = query(collection(db, 'moneyProviders'), where('subAdminId', '==', id));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
      const raw = doc.data() as any;
      const statusByMonth = raw.statusByMonth || {};
      return {
        id: doc.id,
        name: raw.name,
        amount: raw.amount,
        addedDate: raw.addedDate,
        statusByMonth,
      };
    }) as Provider[];
    setProviders(data);
  };

  const handleConfirm = async (providerId: string) => {
    const date = providedDates[providerId];
    if (!date) {
      alert('Please select a provided date');
      return;
    }

    const userInput = prompt('Type your email to confirm payment:');
    if (!userInput || !userInput.trim()) {
      alert('Confirmation cancelled.');
      return;
    }

    const provider = providers.find((p) => p.id === providerId);
    if (!provider) return;

    const currentStatus = provider.statusByMonth || {};
    const updatedStatusByMonth = {
      ...currentStatus,
      [selectedPeriod]: {
        status: 'paid',
        providedDate: date,
      },
    };

    const ref = doc(db, 'moneyProviders', providerId);
    await updateDoc(ref, {
      statusByMonth: updatedStatusByMonth,
    });

    fetchProviders();
  };

  const handleEdit = async (providerId: string) => {
    const email = prompt('Enter your email to confirm editing:');
    if (!email || !email.trim()) {
      alert('Editing cancelled.');
      return;
    }

    const date = prompt('Enter new provided date (yyyy-mm-dd):');
    if (!date || isNaN(Date.parse(date))) {
      alert('Invalid date.');
      return;
    }

    const provider = providers.find((p) => p.id === providerId);
    if (!provider) return;

    const updatedStatusByMonth = {
      ...provider.statusByMonth,
      [selectedPeriod]: {
        status: 'paid',
        providedDate: date,
      },
    };

    const ref = doc(db, 'moneyProviders', providerId);
    await updateDoc(ref, { statusByMonth: updatedStatusByMonth });
    fetchProviders();
  };

  useEffect(() => {
    if (id) fetchProviders();
  }, [id]);

  const paidProviders = providers.filter(
    (p) => p.statusByMonth?.[selectedPeriod]?.status === 'paid'
  );

  const totalAmount = paidProviders.reduce((sum, p) => sum + p.amount, 0);
  const paidCount = paidProviders.length;

  return (
    <ProtectedRoute role="sub-admin">
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Sub-Admin Panel</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Collection Type</label>
            <select
              className="border rounded p-2 w-full md:w-64"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'regular' | 'special')}
            >
              <option value="regular">Regular Collection</option>
              <option value="special">Special Collection</option>
            </select>
          </div>

          {viewMode === 'special' && (
            <div className="bg-white p-6 rounded-xl shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Special Collection Entry</h2>
              <SpecialCollectionForm subAdminId={id as string} />
            </div>
          )}

          {viewMode === 'regular' && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Period</label>
                <select
                  className="border rounded p-2 w-full md:w-64"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  {generatePeriodOptions().map((period) => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Summary for {selectedPeriod}</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[{ period: selectedPeriod, paidCount, totalAmount }]}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="paidCount" fill="#4ade80" name="Paid Count" />
                    <Bar dataKey="totalAmount" fill="#60a5fa" name="Total Amount" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Money Providers (Fixed List)</h2>
                {providers.length === 0 ? (
                  <p className="text-gray-500">No assigned providers yet.</p>
                ) : (
                  <ul className="divide-y">
                    {providers.map((provider) => {
                      const statusEntry = provider.statusByMonth?.[selectedPeriod] || { status: 'unpaid' };
                      const status = statusEntry.status;
                      const providedDate = statusEntry.providedDate;

                      return (
                        <li key={provider.id} className="py-4">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                              <p className="font-medium text-lg">{provider.name}</p>
                              <p className="text-gray-600 text-sm">৳ {provider.amount}</p>
                              <p className="text-gray-500 text-sm">Added: {provider.addedDate}</p>
                              <p className="text-sm">
                                Status:{' '}
                                <span className={`font-semibold ${status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                                  {status}
                                </span>
                              </p>
                              {status === 'paid' && providedDate && (
                                <p className="text-sm text-gray-500">Paid on: {providedDate}</p>
                              )}
                            </div>

                            {status === 'unpaid' ? (
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
                            ) : (
                              <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-blue-700 "
                                onClick={() => handleEdit(provider.id)}
                              >
                                Edit Payment
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
