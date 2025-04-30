'use client';

import { useEffect, useState } from 'react';
import { db } from '@/utils/firestore';
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc
} from 'firebase/firestore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { saveAs } from 'file-saver';

interface SpecialDonor {
  id: string;
  name: string;
  amount: number;
  category: string;
  isPaid: boolean;
  subAdminId: string;
}

const COLORS = ['#4ade80', '#f87171'];

export default function SpecialDonationDashboard() {
  const [donors, setDonors] = useState<SpecialDonor[]>([]);
  const [filtered, setFiltered] = useState<SpecialDonor[]>([]);
  const [subAdmins, setSubAdmins] = useState<Record<string, string>>({});
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total: 0, paid: 0, due: 0, donors: 0 });

  const [categoryFilter, setCategoryFilter] = useState('');
  const [subAdminFilter, setSubAdminFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, subAdminFilter, statusFilter, donors]);

  const fetchData = async () => {
    const snap = await getDocs(collection(db, 'specialCollections'));
    const items: SpecialDonor[] = [];

    for (let docSnap of snap.docs) {
      const data = docSnap.data();
      items.push({ id: docSnap.id, ...data } as SpecialDonor);
    }

    const subAdminMap: Record<string, string> = {};
    const subAdminIds = Array.from(new Set(items.map(i => i.subAdminId)));
    for (let id of subAdminIds) {
      const ref = doc(db, 'users', id);
      const subSnap = await getDoc(ref);
      subAdminMap[id] = subSnap.exists() ? subSnap.data().name || id : id;
    }

    setSubAdmins(subAdminMap);
    setDonors(items);
  };

  const applyFilters = () => {
    const filteredData = donors.filter(d =>
      (!categoryFilter || d.category === categoryFilter) &&
      (!subAdminFilter || d.subAdminId === subAdminFilter) &&
      (!statusFilter || (statusFilter === 'Paid' ? d.isPaid : !d.isPaid))
    );
    setFiltered(filteredData);
    processStats(filteredData);
  };

  const processStats = (items: SpecialDonor[]) => {
    let total = 0, paid = 0, due = 0;
    const categories: Record<string, { paid: number; due: number }> = {};
    const status = { Paid: 0, Due: 0 };

    items.forEach((item) => {
      total += item.amount;
      if (item.isPaid) {
        paid += item.amount;
        categories[item.category] = categories[item.category] || { paid: 0, due: 0 };
        categories[item.category].paid += item.amount;
        status.Paid += item.amount;
      } else {
        due += item.amount;
        categories[item.category] = categories[item.category] || { paid: 0, due: 0 };
        categories[item.category].due += item.amount;
        status.Due += item.amount;
      }
    });

    setSummary({ total, paid, due, donors: items.length });
    setCategoryData(Object.entries(categories).map(([key, value]) => ({
      name: key,
      paid: value.paid,
      due: value.due
    })));
    setStatusData(
      Object.entries(status).map(([key, value]) => ({ name: key, value }))
    );
  };

  const downloadCSV = () => {
    const csvRows = [
      ['Name', 'Amount', 'Category', 'Status', 'Sub-Admin'],
      ...filtered.map(d => [
        d.name,
        d.amount,
        d.category,
        d.isPaid ? 'Paid' : 'Due',
        subAdmins[d.subAdminId] || d.subAdminId,
      ])
    ];
    const blob = new Blob([csvRows.map(row => row.join(',')).join('\n')], { type: 'text/csv' });
    saveAs(blob, 'special_donations.csv');
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black ">Special Donation Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Collection</p>
          <h2 className="text-xl font-bold text-green-600">৳{summary.total}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Paid</p>
          <h2 className="text-xl font-bold text-blue-600">৳{summary.paid}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Due</p>
          <h2 className="text-xl font-bold text-red-600">৳{summary.due}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Donors</p>
          <h2 className="text-xl font-bold text-purple-600">{summary.donors}</h2>
        </div>
      </div>

      {/* Filters + Export */}
      <div className="flex flex-wrap gap-4 mb-6 items-center text-black ">
        <select onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 rounded border">
          <option value="">All Categories</option>
          {[...new Set(donors.map(d => d.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select onChange={(e) => setSubAdminFilter(e.target.value)} className="p-2 rounded border">
          <option value="">All Sub-Admins</option>
          {Object.entries(subAdmins).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <select onChange={(e) => setStatusFilter(e.target.value)} className="p-2 rounded border">
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Due">Due</option>
        </select>
        <button
          onClick={downloadCSV}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold  text-black mb-2">Category Wise Collection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="paid" fill="#34d399" name="Paid" />
              <Bar dataKey="due" fill="#f87171" name="Due" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2 text-black ">Paid vs Due</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-auto text-black">
        <h3 className="text-lg font-semibold mb-3">Detailed Donor Data</h3>
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Sub-Admin</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((donor) => (
              <tr key={donor.id} className="border-t">
                <td className="px-4 py-2">{donor.name}</td>
                <td className="px-4 py-2">৳{donor.amount}</td>
                <td className="px-4 py-2">{donor.category}</td>
                <td className="px-4 py-2">
                  {donor.isPaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Due</span>
                  )}
                </td>
                <td className="px-4 py-2">{subAdmins[donor.subAdminId]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
