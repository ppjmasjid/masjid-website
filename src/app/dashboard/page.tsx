'use client';

import { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firestore';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

interface Provider {
  id: string;
  name: string;
  amount: number;
  subAdminId: string;
  statusByMonth: {
    [month: number]: {
      status: 'paid' | 'unpaid';
      providedDate?: string;
    };
  };
}

export default function Dashboard() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [subAdmins, setSubAdmins] = useState<Record<string, string>>({});
  const [selectedMonth, setSelectedMonth] = useState<'all' | number>('all');
  const printRef = useRef<HTMLDivElement>(null);

  const fetchAllProviders = async () => {
    const snapshot = await getDocs(collection(db, 'moneyProviders'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Provider));
    setProviders(data);
  };

  const fetchSubAdmins = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const adminMap: Record<string, string> = {};
    snapshot.forEach((doc) => {
      const { name } = doc.data();
      adminMap[doc.id] = name;
    });
    setSubAdmins(adminMap);
  };

  useEffect(() => {
    fetchAllProviders();
    fetchSubAdmins();
  }, []);

  const filteredProviders = providers.filter((p) => {
    if (selectedMonth === 'all') return true;
    const monthData = p.statusByMonth?.[selectedMonth];
    return monthData?.status === 'paid';
  });

  const totalAmount = filteredProviders.reduce((sum, p) => sum + p.amount, 0);
  const totalProviders = filteredProviders.length;
  const highest = filteredProviders.reduce(
    (max, p) => (p.amount > max.amount ? p : max),
    { amount: 0, name: '' }
  );
  const subAdminCount = new Set(filteredProviders.map((p) => p.subAdminId)).size;

  const subAdminSummary = Object.entries(
    filteredProviders.reduce((acc, p) => {
      const name = subAdmins[p.subAdminId] || p.subAdminId;
      acc[name] = (acc[name] || 0) + p.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const downloadCSV = () => {
    const csvContent = [
      ['Sr.', 'Name', 'Amount', 'Sub-Admin', 'Status', 'Provided Date'],
      ...filteredProviders.map((p, i) => {
        const monthInfo: { status?: 'paid' | 'unpaid'; providedDate?: string } = selectedMonth === 'all'
          ? {}
          : p.statusByMonth?.[selectedMonth] || {};

        return [
          i + 1,
          p.name,
          p.amount,
          subAdmins[p.subAdminId] || p.subAdminId,
          monthInfo?.status || '-',
          monthInfo?.providedDate || '-',
        ];
      }),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'money_providers.csv';
    link.click();
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Dashboard</title>
              <style>
                body { font-family: Arial; padding: 20px; }
                table, th, td { border: 1px solid black; border-collapse: collapse; padding: 5px; }
                h1, h2 { margin: 10px 0; }
              </style>
            </head>
            <body>${printRef.current.innerHTML}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-10 px-4" ref={printRef}>
        <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

        {/* Month Filter */}
        <div className="mb-6 w-full sm:w-64">
          <label className="block mb-1 text-sm font-medium text-gray-700">Select Month</label>
          <select
            className="w-full border rounded p-2"
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
          >
            <option value="all">All Months</option>
            {months.map((month, idx) => (
              <option key={idx} value={idx}>{month}</option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Total Providers</h2>
            <p className="text-2xl text-blue-600">{totalProviders}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Total Amount</h2>
            <p className="text-2xl text-green-600">৳ {totalAmount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Highest Donation</h2>
            <p className="text-2xl text-red-600">৳ {highest.amount}</p>
            <p className="text-sm text-gray-500">{highest.name}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-lg font-semibold">Sub-Admins</h2>
            <p className="text-2xl text-purple-600">{subAdminCount}</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">📊 Donation per Sub-Admin</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subAdminSummary}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">🥧 Sub-Admin Share (Pie Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={subAdminSummary}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {subAdminSummary.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            ⬇️ Download CSV
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
          >
            🖨️ Print Dashboard
          </button>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded shadow overflow-auto">
          <h2 className="text-xl font-semibold mb-4">📄 All Money Providers</h2>
          {filteredProviders.length === 0 ? (
            <p className="text-gray-500">No data available.</p>
          ) : (
            <table className="w-full border text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Sub-Admin</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Provided Date</th>
                </tr>
              </thead>
              <tbody>
              {filteredProviders.map((p, i) => {
  const monthInfo =
    selectedMonth === 'all'
      ? undefined
      : p.statusByMonth?.[selectedMonth];

  return (
    <tr key={p.id} className="hover:bg-gray-50">
      <td className="p-2 border">{i + 1}</td>
      <td className="p-2 border">{p.name}</td>
      <td className="p-2 border">৳ {p.amount}</td>
      <td className="p-2 border">{subAdmins[p.subAdminId] || p.subAdminId}</td>
      <td className="p-2 border capitalize">{monthInfo?.status || '-'}</td>
      <td className="p-2 border">{monthInfo?.providedDate || '-'}</td>
    </tr>
  );
})}

              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
