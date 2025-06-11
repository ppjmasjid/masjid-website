 'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firestore';
import { Loader2, CheckCircle, XCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const ProviderDetailsPage = () => {
  const params = useParams();
  const providerId = params?.id as string;

  const [provider, setProvider] = useState<MoneyProvider | null>(null);
  const [subAdminName, setSubAdminName] = useState<string>('N/A');
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        if (!providerId) return;

        const docRef = doc(db, 'moneyProviders', providerId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const providerData = docSnap.data() as MoneyProvider;
          setProvider(providerData);

          const subAdminDoc = await getDoc(doc(db, 'admins', providerData.subAdminId));
          if (subAdminDoc.exists()) {
            const subAdminData = subAdminDoc.data();
            setSubAdminName(subAdminData.name || 'N/A');
          }

          const yearsSet = new Set<string>();
          const statusKeys = Object.keys(providerData.statusByMonth || {});
          statusKeys.forEach(key => {
            const yearMatch = key.match(/\d{4}$/);
            if (yearMatch) {
              yearsSet.add(yearMatch[0]);
            }
          });
          const yearsArray = Array.from(yearsSet).sort();
          setAvailableYears(yearsArray);
          setSelectedYear(yearsArray[0] || new Date().getFullYear().toString());
        } else {
          console.error('Provider not found');
        }
      } catch (error) {
        console.error('Error fetching provider:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [providerId]);

  const exportCSV = () => {
    if (!provider) return;
    const rows = months.map(month => {
      const key = `${month}${selectedYear}`;
      const monthData = provider.statusByMonth?.[key];
      const providedDate = monthData?.providedDate || '';
      const status = monthData?.status || 'unpaid';
      let comment = 'Unpaid';
      if (providedDate) {
        const day = parseInt(providedDate.split('-')[2], 10);
        if (day < 5) {
          comment = 'Better';
        } else if (day < 7) {
          comment = 'Good';
        } else if (day < 10) {
          comment = 'Not So Good';
        } else {
          comment = 'Late';
        }
      }
      return [month, status, providedDate, comment];
    });

    const csvContent =
      'Month,Status,Provided Date,Comment\n' +
      rows.map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${provider.name}_${selectedYear}_report.csv`);
    link.click();
  };

  if (!providerId || loading) return (
    <div className="p-6 flex justify-center items-center h-96">
      <Loader2 className="animate-spin w-10 h-10 text-primary" />
    </div>
  );
  if (!provider) return <div className="p-6">Provider not found.</div>;

  const { name, statusByMonth } = provider;
  const headerComment = getHeaderComment(statusByMonth, selectedYear);

  return (
    <div className="p-6   mx-auto bg-gradient-to-br from-emerald-100 to-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-gradient-to-br from-emerald-100 to-white   p-6 rounded-2xl shadow-2xl">
        <div>
          <h1 className="text-3xl font-bold text-[#5c2121] mb-2">Provider: {name}</h1>
          <p className="text-lg text-gray-700">Year: {selectedYear}</p>
        </div>
        <div className="text-right mt-4 sm:mt-0">
          <p className="text-xl font-semibold text-[#5c2121]">Sub-admin: {subAdminName}</p>
          <p className="text-md text-gray-800 mt-1">Comment: <span className="italic">{headerComment}</span></p>
        </div>
      </div>

      {/* Filters and Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4 text-gray-800">
        <select
          className="border px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-red-300 texy-black"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setAnimateKey(prev => prev + 1);
          }}
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={animateKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-4 bg-[#5c2121] text-white font-bold p-4">
            <div>Month</div>
            <div>Status</div>
            <div>Provided Date</div>
            <div>Comment</div>
          </div>

          {months.map((month) => {
            const key = `${month}${selectedYear}`;
            const monthData = statusByMonth?.[key];

            const isPaid = monthData?.status === 'paid';
            const providedDate = monthData?.providedDate;

            let comment = 'Unpaid';
            if (providedDate) {
              const day = parseInt(providedDate.split('-')[2], 10);
              if (day < 5) {
                comment = 'Better';
              } else if (day < 7) {
                comment = 'Good';
              } else if (day < 10) {
                comment = 'Not So Good';
              } else {
                comment = 'Late';
              }
            }

            return (
              <div
                key={month}
                className={`grid grid-cols-4 items-center px-4 py-3 border-b transition-all duration-300 text-gray-800 ${
                  isPaid ? 'bg-green-50 hover:bg-green-100' : 'bg-red-50 hover:bg-red-100'
                }`}
              >
                <div className="font-medium text-gray">{month}</div>
                <div className="flex items-center gap-2 font-semibold text-gray-800">
                  {isPaid ? (
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-600 w-5 h-5" />
                  )}
                  <span>{monthData?.status ? capitalizeFirstLetter(monthData.status) : 'Unpaid'}</span>
                </div>
                <div className="text-sm text-gray-700">
                  {providedDate || '----------'}
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  {comment}
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Helper
function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// New header comment logic
function getHeaderComment(statusByMonth: MoneyProvider['statusByMonth'] | undefined, selectedYear: string) {
  if (!statusByMonth) return 'Normal';

  let earlyPaymentCount = 0;
  months.forEach(month => {
    const key = `${month}${selectedYear}`;
    const providedDate = statusByMonth[key]?.providedDate;
    if (providedDate) {
      const day = parseInt(providedDate.split('-')[2], 10);
      if (day < 5) earlyPaymentCount++;
    }
  });

  if (earlyPaymentCount > 5) {
    return 'Excellent';
  } else if (earlyPaymentCount >= 3) {
    return 'Good';
  } else {
    return 'Normal';
  }
}

export default ProviderDetailsPage;
