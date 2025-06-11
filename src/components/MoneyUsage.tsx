'use client';

import { useEffect, useState } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
} from 'firebase/firestore';
import { db } from '@/utils/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // <-- updated
import Select from 'react-select';
interface UsageRecord {
    id: string;
    category: string;
    whereUsed: string;
    amount: number;
    imageUrl: string;
    createdBy?: string;
    createdAt?: string;
}

const imgbbAPIKey = 'f7907af46aa2957d2f64c92fb55f3794';

export default function MoneyUsage() {
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [whereUsed, setWhereUsed] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [usageRecords, setUsageRecords] = useState<UsageRecord[]>([]);
    const [balanceMap, setBalanceMap] = useState<Record<string, number>>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [subAdminName, setSubAdminName] = useState<string>('');
    const categoryOptions = categoryList.map((cat) => ({ label: cat, value: cat })); <Select
        isMulti
        options={categoryOptions}
        value={categoryOptions.filter(opt => selectedCategories.includes(opt.value))}
        onChange={(selectedOptions) =>
            setSelectedCategories(selectedOptions.map(opt => opt.value))
        }
        className="react-select-container"
        classNamePrefix="react-select"
    />
    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await fetchSubAdminName(user.uid);
                await fetchCategories(user.uid);
                await fetchBalances();
                await fetchUsageRecords();
            }
        });

        return () => unsubscribe(); // cleanup
    }, []);


    const fetchSubAdminName = async (uid: string) => {
        const docRef = doc(db, 'users', uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            const data = snap.data();
            if (data.name) setSubAdminName(data.name);
        }
    };

    const fetchCategories = async (uid: string) => {
        const snap = await getDocs(collection(db, 'specialDonationCategories'));
        const cats: string[] = [];
        snap.forEach((doc) => {
            const data = doc.data();
            if (data?.name && Array.isArray(data.subAdminIds) && data.subAdminIds.includes(uid)) {
                cats.push(data.name);
            }
        });
        setCategoryList(cats);
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

        const usedSnap = await getDocs(collection(db, 'moneyUsages'));
        usedSnap.forEach((doc) => {
            const data = doc.data();
            const cat = data.category || 'Uncategorized';
            paid[cat] = (paid[cat] || 0) - data.amount;
        });

        setBalanceMap(paid);
    };

    const fetchUsageRecords = async () => {
        const snap = await getDocs(collection(db, 'moneyUsages'));
        const records: UsageRecord[] = [];
        snap.forEach((doc) => {
            const data = doc.data();
            records.push({
                id: doc.id,
                category: data.category,
                whereUsed: data.whereUsed,
                amount: data.amount,
                imageUrl: data.imageUrl,
                createdBy: data.createdBy || '',
                createdAt: data.createdAt || '',
            });
        });
        setUsageRecords(records);
    };

    const handleSubmit = async () => {
        if (selectedCategories.length === 0 || !whereUsed || !amount) {
            alert('Please fill all required fields.');
            return;
        }


        if (editingId) {
            const confirm = window.confirm('Are you sure you want to update this usage?');
            if (!confirm) return;
        }


        else {
            const confirm = window.confirm('Are you sure you want to add this usage?');
            if (!confirm) return;

            const available = selectedCategories.reduce(
                (sum, cat) => sum + (balanceMap[cat] || 0),
                0
            );
            if (amount > available) {
                alert('Not sufficient combined balance across selected categories.');
                return;
            }
        }

        try {
            let uploadedImageUrl = '';

            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
                    method: 'POST',
                    body: formData,
                });

                const imgData = await res.json();
                uploadedImageUrl = imgData.data.url;
            }

            const now = new Date();
            const formattedDate = now.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });

            if (editingId) {
                await updateDoc(doc(db, 'moneyUsages', editingId), {
                    category: '', // or remove if not needed in the doc

                    whereUsed,
                    amount,
                    imageUrl: uploadedImageUrl,
                });
                alert('Usage updated');
            } else {
                // Clone and sort categories by balance ascending first
                const sortedCategories = [...selectedCategories].sort((a, b) => (balanceMap[a] ?? 0) - (balanceMap[b] ?? 0));
                let remainingAmount = amount;

                // Track usage per category
                const categoryUsages: { category: string; amount: number }[] = [];

                for (const cat of sortedCategories) {
                    const available = balanceMap[cat] ?? 0;
                    if (available <= 0) continue;

                    const useAmount = Math.min(available, remainingAmount);
                    categoryUsages.push({ category: cat, amount: useAmount });
                    remainingAmount -= useAmount;

                    if (remainingAmount <= 0) break;
                }

                if (remainingAmount > 0) {
                    alert("Not enough balance after distribution. Should not happen.");
                    return;
                }

                for (const usage of categoryUsages) {
                    await addDoc(collection(db, 'moneyUsages'), {
                        category: usage.category,
                        whereUsed,
                        amount: usage.amount,
                        imageUrl: uploadedImageUrl,
                        createdBy: subAdminName,
                        createdAt: formattedDate,
                    });
                }

                alert('Usage added successfully');
            }

            resetForm();
            fetchUsageRecords();
            fetchBalances();
        } catch (error) {
            console.error(error);
            alert('Failed to submit usage');
        }
    };

    const handleEdit = (record: UsageRecord) => {
        setSelectedCategories(record.category.split(' + '));

        setWhereUsed(record.whereUsed);
        setAmount(record.amount);
        setEditingId(record.id);
    };

    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this record?');
        if (!confirm) return;

        try {
            await deleteDoc(doc(db, 'moneyUsages', id));
            alert('Record deleted');
            fetchUsageRecords();
            fetchBalances();
        } catch (err) {
            console.error(err);
            alert('Failed to delete record');
        }
    };

    const resetForm = () => {
        setSelectedCategories([]);

        setWhereUsed('');
        setAmount(0);
        setImageFile(null);
        setEditingId(null);
    };

    const totalBalance = Object.values(balanceMap).reduce((sum, val) => sum + val, 0);
    const combinedBalance = selectedCategories.reduce(
        (sum, cat) => sum + (balanceMap[cat] || 0),
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-6 text-gray-900 ">
            <h2 className="text-2xl font-bold mb-6 text-gray-500">Money Usage Management</h2>

            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
                    <div>
                        <label className="block font-semibold">Select Category</label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={categoryOptions.filter(opt => selectedCategories.includes(opt.value))}
                            onChange={(selectedOptions) =>
                                setSelectedCategories(selectedOptions.map(opt => opt.value))
                            }
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                        <p className="text-sm mt-1 text-gray-600">
                            Available:{' '}
                            <span className={combinedBalance <= 0 ? 'text-red-600' : 'text-green-600'}>
                                ৳{combinedBalance}
                            </span>
                        </p>
                    </div>

                    <div>
                        <label className="block font-semibold">Where Used</label>
                        <input
                            type="text"
                            value={whereUsed}
                            onChange={(e) => setWhereUsed(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Amount (৳)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Upload Receipt/Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            className="w-full border rounded p-2"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                    >
                        {editingId ? 'Update Usage' : 'Submit Usage'}
                    </button>
                    {editingId && (
                        <button
                            onClick={resetForm}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-lg font-bold mb-4 text-gray-500">Usage Records</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4">Category</th>
                                <th className="py-2 px-4">Where Used</th>
                                <th className="py-2 px-4">Amount</th>
                                <th className="py-2 px-4">Image</th>
                                <th className="py-2 px-4 hidden sm:table-cell">By</th>
                                <th className="py-2 px-4 hidden sm:table-cell">Date</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usageRecords.map((record, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{record.category}</td>
                                    <td className="px-4 py-2">{record.whereUsed}</td>
                                    <td className="px-4 py-2">৳{record.amount}</td>
                                    <td className="px-4 py-2 text-center">
                                        {record.imageUrl ? (
                                            <a
                                                href={record.imageUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 italic">No image</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 hidden sm:table-cell">{record.createdBy || '-'}</td>
                                    <td className="px-4 py-2 hidden sm:table-cell">{record.createdAt || '-'}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        {record.createdBy === subAdminName ? (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(record)}
                                                    className="text-yellow-600 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(record.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-400 italic">No actions</span>
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
}
