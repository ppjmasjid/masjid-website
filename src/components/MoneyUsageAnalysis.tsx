'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firestore';

interface UsageRecord {
    category: string;
    whereUsed: string;
    amount: number;
    createdAt: string;
    createdBy?: string;
    imageUrl?: string; // new field
}

const MoneyUsageAnalysis = () => {
    const [usageRecords, setUsageRecords] = useState<UsageRecord[]>([]);
    const [balanceMap, setBalanceMap] = useState<Record<string, number>>({});

    useEffect(() => {
        fetchUsageRecords();
        fetchBalances();
    }, []);

    const fetchUsageRecords = async () => {
        const snap = await getDocs(collection(db, 'moneyUsages'));
        const records: UsageRecord[] = [];
        snap.forEach((doc) => {
            const data = doc.data();
            records.push({
                category: data.category,
                whereUsed: data.whereUsed,
                amount: data.amount,
                createdAt: data.createdAt || '',
                createdBy: data.createdBy || '',
                imageUrl: data.imageUrl || '', // handle image field
            });
        });
        setUsageRecords(records);
    };

    const fetchBalances = async () => {
        const snap = await getDocs(collection(db, 'specialCollections'));
        const paid: Record<string, number> = {};
        snap.forEach((doc) => {
            const data = doc.data();
            if (data.isPaid) {
                const cat = data.category || 'Uncategorized';
                paid[cat] = (paid[cat] || 0) + data.amount;
            }
        });
        setBalanceMap(paid);
    };

    const totalBalance = Object.values(balanceMap).reduce((sum, val) => sum + val, 0);
    const totalUsage = usageRecords.reduce((sum, record) => sum + record.amount, 0);
    const remainingBalance = totalBalance - totalUsage;

    const getCategoryUsage = (category: string) => {
        return usageRecords
            .filter((record) => record.category === category)
            .reduce((sum, record) => sum + record.amount, 0);
    };

    const allCategories = Array.from(new Set([
        ...Object.keys(balanceMap),
        ...usageRecords.map((rec) => rec.category)
    ]));

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-500">Money Usage Analysis</h2>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Summary Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-green-100 rounded-lg shadow-sm text-center">
                        <h4 className="font-medium text-gray-600">Total Balance</h4>
                        <p className="text-xl font-bold text-green-600">৳{totalBalance}</p>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-sm text-center">
                        <h4 className="font-medium text-gray-600">Total Usage</h4>
                        <p className="text-xl font-bold text-yellow-600">৳{totalUsage}</p>
                    </div>
                    <div className="p-4 bg-red-100 rounded-lg shadow-sm text-center">
                        <h4 className="font-medium text-gray-600">Remaining Balance</h4>
                        <p className="text-xl font-bold text-red-600">৳{remainingBalance}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Category-wise Summary</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4">Category</th>
                                <th className="py-2 px-4">Collected</th>
                                <th className="py-2 px-4">Used</th>
                                <th className="py-2 px-4">Remaining</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCategories.map((category, idx) => {
                                const collected = balanceMap[category] || 0;
                                const used = getCategoryUsage(category);
                                const remaining = collected - used;
                                return (
                                    <tr key={idx} className="border-t">
                                        <td className="px-4 py-2">{category}</td>
                                        <td className="px-4 py-2">৳{collected}</td>
                                        <td className="px-4 py-2">৳{used}</td>
                                        <td className="px-4 py-2">৳{remaining}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Detailed Usage Records</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4">Category</th>
                                <th className="py-2 px-4">Where Used</th>
                                <th className="py-2 px-4">Amount</th>
                                <th className="py-2 px-4">Date</th>
                                <th className="py-2 px-4">Sub-Admin</th>
                                <th className="py-2 px-4">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usageRecords.map((record, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{record.category}</td>
                                    <td className="px-4 py-2">{record.whereUsed}</td>
                                    <td className="px-4 py-2">৳{record.amount}</td>
                                    <td className="px-4 py-2">{record.createdAt}</td>
                                    <td className="px-4 py-2">{record.createdBy || 'Unknown'}</td>
                                    <td className="px-4 py-2">
                                        {record.imageUrl ? (
                                            <a
                                                href={record.imageUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src={record.imageUrl}
                                                    alt="Usage"
                                                    className="h-12 w-12 object-cover rounded"
                                                />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">No Image</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MoneyUsageAnalysis;
