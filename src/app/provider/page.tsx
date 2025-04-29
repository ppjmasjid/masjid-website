 'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firestore';
import { Loader2, Download } from 'lucide-react';
import { saveAs } from 'file-saver';

interface MoneyProvider {
  id: string;
  name: string;
  subAdminId: string;
  addedDate: string;
  providedDate: string | null;
  status: 'paid' | 'unpaid';
  statusByMonth?: {
    [key: string]: {
      status: 'paid' | 'unpaid';
      providedDate?: string;
    };
  };
}

const ProvidersPage = () => {
  const [providers, setProviders] = useState<MoneyProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<MoneyProvider[]>([]);
  const [subAdmins, setSubAdmins] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'moneyProviders'));
        const providerList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as MoneyProvider[];

        setProviders(providerList);
        setFilteredProviders(providerList);

        const adminsSnapshot = await getDocs(collection(db, 'admins'));
        const adminData: Record<string, string> = {};
        adminsSnapshot.forEach((doc) => {
          const data = doc.data();
          adminData[doc.id] = data.name || 'Unknown';
        });
        setSubAdmins(adminData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = providers.filter(provider =>
      provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProviders(filtered);
  }, [searchQuery, providers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-100 to-pink-300">
        <Loader2 className="animate-spin h-12 w-12 text-[#5c2121]" />
      </div>
    );
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Sub Admin', 'Last Provided Date', 'Header Comment'];
    const rows = filteredProviders.map(provider => {
      const lastProvidedDate = getLastProvidedDate(provider.statusByMonth) || 'N/A';
      const headerComment = getHeaderComment(provider.statusByMonth);
      const subAdminName = subAdmins[provider.subAdminId] || 'N/A';

      return [
        `"${provider.name}"`,
        `"${subAdminName}"`,
        `"${lastProvidedDate}"`,
        `"${headerComment}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'providers_list.csv');
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-[#5c2121] drop-shadow-lg mb-4 md:mb-0 animate-fade-in">
          📋 Providers List
        </h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 Search provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 transition w-64 text-gray-700"
          />
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition shadow-md"
          >
            <Download className="w-5 h-5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-xl animate-slide-up">
        <table className="min-w-full bg-white border border-pink-300">
          <thead className="bg-pink-200 text-[#5c2121] text-lg">
            <tr>
              <th className="p-4 border-b">Sr.</th>
              <th className="p-4 border-b">Provider Name</th>
              <th className="p-4 border-b">Assigned Sub Admin</th>
              <th className="p-4 border-b">Comment</th>
              <th className="p-4 border-b">Last Provided Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.map((provider, index) => {
              const lastProvidedDate = getLastProvidedDate(provider.statusByMonth);
              const headerComment = getHeaderComment(provider.statusByMonth);

              return (
                <tr
                  key={provider.id}
                  className="hover:bg-pink-100 transition-all duration-300 text-center text-gray-700"
                >
                  <td className="p-4 border-b">{index + 1}</td>
                  <td className="p-4 border-b font-semibold text-pink-700">
                    <Link
                      href={`/provider/${provider.id}`}
                      className="hover:underline hover:text-pink-900 transition duration-200"
                    >
                      {provider.name}
                    </Link>
                  </td>
                  <td className="p-4 border-b">
                    {subAdmins[provider.subAdminId] || (
                      <span className="italic text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="p-4 border-b">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {headerComment}
                    </span>
                  </td>
                  <td className="p-4 border-b">
                    {lastProvidedDate ? (
                      <span className="text-sm">{lastProvidedDate}</span>
                    ) : (
                      <span className="text-gray-400">--------</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden mt-6 animate-fade-in">
        {filteredProviders.map((provider, index) => {
          const lastProvidedDate = getLastProvidedDate(provider.statusByMonth);
          const headerComment = getHeaderComment(provider.statusByMonth);

          return (
            <div
              key={provider.id}
              className="bg-white p-4 rounded-lg shadow-lg border border-pink-200 transition-all hover:shadow-2xl"
            >
              <div className="font-bold text-pink-700 text-lg mb-2">
                {index + 1}. {provider.name}
              </div>
              <div className="text-gray-600 text-sm mb-1">
                Sub Admin: <span className="font-semibold">{subAdmins[provider.subAdminId] || 'N/A'}</span>
              </div>
              <div className="text-gray-600 text-sm mb-1">
                Comment: <span className="text-green-600 font-semibold">{headerComment}</span>
              </div>
              <div className="text-gray-600 text-sm">
                Last Provided: {lastProvidedDate || '--------'}
              </div>
              <Link
                href={`/provider/${provider.id}`}
                className="mt-2 inline-block text-sm text-pink-700 hover:text-pink-900 hover:underline"
              >
                View Details →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helpers
function getLastProvidedDate(statusByMonth?: MoneyProvider['statusByMonth']) {
  if (!statusByMonth) return null;

  const entries = Object.entries(statusByMonth)
    .filter(([_, val]) => val.status === 'paid')
    .sort((a, b) => {
      const dateA = new Date(a[1].providedDate || '');
      const dateB = new Date(b[1].providedDate || '');
      return dateB.getTime() - dateA.getTime();
    });

  return entries[0]?.[1]?.providedDate || null;
}


function getHeaderComment(statusByMonth?: MoneyProvider['statusByMonth']) {
  if (!statusByMonth) return 'No Records';

  const currentYear = new Date().getFullYear();
  let earlyPayments = 0;

  Object.values(statusByMonth).forEach((entry) => {
    if (entry.status === 'paid' && entry.providedDate) {
      const date = new Date(entry.providedDate);
      const day = date.getDate();
      const year = date.getFullYear();

      if (year === currentYear && day <= 5) {
        earlyPayments++;
      }
    }
  });

  if (earlyPayments >= 10) {
    return 'Excellent';
  } else if (earlyPayments >= 3) {
    return 'Good';
  } else {
    return 'Normal';
  }
}

 

export default ProvidersPage;
