'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import SpecialCollectionForm from '@/components/SpecialCollectionForm';
import MoneyUsage from '@/components/MoneyUsage';
import { getDoc } from 'firebase/firestore';

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



export default function SubAdminPanel() {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState<'regular' | 'special'|'special collection usage '>('regular');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providedDates, setProvidedDates] = useState<{ [key: string]: string }>({});
  const [selectedPeriod, setSelectedPeriod] = useState<string>(() => {
    const now = new Date();
    return `${months[now.getMonth()]}${now.getFullYear()}`;
  });
//fire period
const [allowedYears, setAllowedYears] = useState<number[]>([]);
const generatePeriodOptions = (allowedYears: number[]) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const options: string[] = [];

  allowedYears.forEach((year) => {
    months.forEach((month) => {
      options.push(`${month}${year}`);
    });
  });

  return options;
};


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
  //fire period
  useEffect(() => {
    const fetchYears = async () => {
      const docRef = doc(db, 'settings', 'yearControl');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAllowedYears(data.allowedYears || []);
      }
    };
  
    fetchYears();
  }, []);
  

  const paidProviders = providers.filter(
    (p) => p.statusByMonth?.[selectedPeriod]?.status === 'paid'
  );

  const totalAmount = paidProviders.reduce((sum, p) => sum + p.amount, 0);
  const paidCount = paidProviders.length;

  return (
    <ProtectedRoute role="sub-admin">
      <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white p-4 sm:p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-extrabold text-center text-blue-800">Sub-Admin Panel</h1>
  
          {/* Collection Type */}
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">📂 Collection Type</label>
            <select
              className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'regular' | 'special'|'special collection usage ')}
            >
              <option value="regular">Regular Collection</option>
              <option value="special">Special Collection</option>
              <option value="special collection usage ">Special Collection Usage</option>
            </select>
          </div>
  
          {/* Special Collection Form */}
          {viewMode === 'special' && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">✨ Special Collection Entry</h2>
              <SpecialCollectionForm subAdminId={id as string} />
            </div>
          )}
          {/* Special Collection Form */} 
          {viewMode === 'special collection usage ' && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">✨ Special Collection Entry</h2>
              <MoneyUsage  />
            </div>
          )}
  
          {/* Regular Collection View */}
          {viewMode === 'regular' && (
            <>
              {/* Period Selector */}
              <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Select Period</label>
                <select
                  className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  {generatePeriodOptions(allowedYears).map((period) => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>
  
              {/* Summary Chart */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Summary for {selectedPeriod}</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[{ period: selectedPeriod, paidCount, totalAmount }]}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="paidCount" fill="#34d399" name="Paid Count" />
                    <Bar dataKey="totalAmount" fill="#60a5fa" name="Total Amount" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
  
              {/* Provider List */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">💼 Money Providers</h2>
                {providers.length === 0 ? (
                  <p className="text-gray-500">No assigned providers yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {providers.map((provider) => {
                      const statusEntry = provider.statusByMonth?.[selectedPeriod] || { status: 'unpaid' };
                      const status = statusEntry.status;
                      const providedDate = statusEntry.providedDate;
  
                      return (
                        <li key={provider.id} className="py-4">
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            {/* Provider Details */}
                            <div className="flex-1 space-y-1">
                              <p className="text-lg font-semibold text-gray-800">{provider.name}</p>
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
  
                            {/* Actions */}
                            <div className="w-full md:w-auto space-y-2">
                              {status === 'unpaid' ? (
                                <>
                                  <input
                                    type="date"
                                    className="w-full md:w-48 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                    value={providedDates[provider.id] || ''}
                                    onChange={(e) =>
                                      setProvidedDates((prev) => ({ ...prev, [provider.id]: e.target.value }))
                                    }
                                  />
                                  <button
                                    className="w-full md:w-48 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                                    onClick={() => handleConfirm(provider.id)}
                                  >
                                    Confirm Payment
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="w-full md:w-48 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition"
                                  onClick={() => handleEdit(provider.id)}
                                >
                                  Edit Payment
                                </button>
                              )}
                            </div>
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
  