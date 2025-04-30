'use client';

import { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firestore';
import SpecialCollectionForm from '@/components/specialdonationdashboard';

 

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import MoneyUsageAnalysis  from '@/components/MoneyUsageAnalysis';
 
interface Provider {
  id: string;
  name: string;
  amount: number;
  subAdminId: string;
  statusByMonth: {
    [periodKey: string]: {
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

export default function Dashboard() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [subAdmins, setSubAdmins] = useState<Record<string, string>>({});
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | string>('all');
  const [analyzeWholeYear, setAnalyzeWholeYear] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
// 2 part 
const [viewMode, setViewMode] = useState<'regular' | 'special' | 'special collection summary'>('regular');


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

  const filteredProviders = (() => {
    if (selectedPeriod === 'all') {
      // Flatten ALL paid entries across all months for all providers
      return providers.flatMap((p) => {
        return Object.entries(p.statusByMonth || {})
          .filter(([_, val]) => val.status === 'paid')
          .map(([monthKey, val]) => ({
            ...p,
            providedDate: val.providedDate || '-',
            monthKey,
          }));
      });
    }

    if (analyzeWholeYear && /^\d{4}$/.test(selectedPeriod)) {
      const year = selectedPeriod;
      return providers.flatMap((p) => {
        return Object.entries(p.statusByMonth || {})
          .filter(([key, val]) => key.endsWith(year) && val.status === 'paid')
          .map(([monthKey, val]) => ({
            ...p,
            providedDate: val.providedDate || '-',
            monthKey,
          }));
      });
    }

    return providers
      .filter((p) => p.statusByMonth?.[selectedPeriod]?.status === 'paid')
      .map((p) => ({
        ...p,
        providedDate: p.statusByMonth?.[selectedPeriod]?.providedDate || '-',
        monthKey: selectedPeriod,
      }));
  })();


  const totalAmount = filteredProviders.reduce((sum, p) => sum + p.amount, 0);
  const totalProviders = new Set(filteredProviders.map((p) => p.id)).size;


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


  const downloadCSV = () => {
    const csvContent = [
      ['Sr.', 'Name', 'Amount', 'Sub-Admin', 'Status', 'Provided Date'],
      ...filteredProviders.map((p, i) => {
        const monthInfo =
          selectedPeriod === 'all' || (analyzeWholeYear && /^\d{4}$/.test(selectedPeriod))
            ? undefined
            : p.statusByMonth?.[selectedPeriod];
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
          <html><head><title>Print Dashboard</title></head>
          <body>${printRef.current.innerHTML}</body></html>
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

        {/* Collection Type */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">📂 Collection Type</label>
          <select
            className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'regular' | 'special' | 'special collection summary')}
          >
            <option value="regular">Regular Collection</option>
            <option value="special">Special Collection</option>
            < option value="special collection summary">Special Collection Summary</option> 
          </select>
        </div>


        {/* Special Collection Form */}
        {viewMode === 'special' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">✨ Special Collection Entry</h2>
            <SpecialCollectionForm/>
           
           
          </div>
        )}

        {/* Special Collection ueseg summary */}
        {viewMode === 'special collection summary' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">✨ Special Collection Entry</h2>
          
           
            <MoneyUsageAnalysis />
          </div>
        )}


    {/* Regular Collection View */}
    {viewMode === 'regular' && (
        <div>

          <div className="mb-6 w-full sm:w-64">
            <label className="block mb-1 text-sm font-medium text-gray-700">Select Period</label>
            <select
              className="w-full border rounded p-2"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="all">All Periods</option>
              {generatePeriodOptions().map((period) => (
                <option key={period} value={period}>{period}</option>
              ))}
              {[2024, 2025, 2026].map((year) => (
                <option key={year} value={String(year)}>{year}</option>
              ))}
            </select>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="analyzeYear"
                checked={analyzeWholeYear}
                onChange={() => setAnalyzeWholeYear(!analyzeWholeYear)}
              />
              <label htmlFor="analyzeYear" className="text-sm text-gray-700">Enable Full Year Analysis</label>
            </div>
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
                      selectedPeriod === 'all' || (analyzeWholeYear && /^\d{4}$/.test(selectedPeriod))
                        ? undefined
                        : p.statusByMonth?.[selectedPeriod];
                    return (
                      <tr key={`${p.id}-${i}`} className="hover:bg-gray-50">
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
        )}
      </div>
   
    </div>
  );
}
