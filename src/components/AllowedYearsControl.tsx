'use client';

import { useEffect, useState } from 'react';
import { db } from '@/utils/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AllowedYearsControl() {
  const [years, setYears] = useState<number[]>([]);
  const [inputYear, setInputYear] = useState('');

  useEffect(() => {
    const fetchYears = async () => {
      const docRef = doc(db, 'settings', 'yearControl');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setYears(docSnap.data().allowedYears || []);
      }
    };

    fetchYears();
  }, []);

  const handleAddYear = async () => {
    const yearNum = parseInt(inputYear);
    if (!yearNum || years.includes(yearNum)) return;

    const confirmAdd = confirm(`Are you sure you want to add the year ${yearNum}?`);
    if (!confirmAdd) return;

    const updatedYears = [...years, yearNum].sort();
    await setDoc(doc(db, 'settings', 'yearControl'), { allowedYears: updatedYears });
    setYears(updatedYears);
    setInputYear('');
  };

  const handleRemoveYear = async (yearToRemove: number) => {
    const confirmation1 = prompt(
      `⚠️ First confirmation: Type the year you want to remove: ${yearToRemove}`
    );
    if (confirmation1 !== String(yearToRemove)) {
      alert('❌ First confirmation failed. Deletion cancelled.');
      return;
    }

    const confirmation2 = prompt(
      `⚠️ Second confirmation: Type the year again to confirm removal: ${yearToRemove}`
    );
    if (confirmation2 !== String(yearToRemove)) {
      alert('❌ Second confirmation failed. Deletion cancelled.');
      return;
    }

    const updatedYears = years.filter((y) => y !== yearToRemove);
    await setDoc(doc(db, 'settings', 'yearControl'), { allowedYears: updatedYears });
    setYears(updatedYears);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Manage Allowed Years</h2>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="number"
          placeholder="Enter year (e.g., 2025)"
          value={inputYear}
          onChange={(e) => setInputYear(e.target.value)}
          className="border px-3 py-2 rounded-md w-48"
        />
        <button
          onClick={handleAddYear}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Year
        </button>
      </div>

      {years.length === 0 ? (
        <p className="text-gray-500">No years added yet.</p>
      ) : (
        <ul className="space-y-2">
          {years.map((year) => (
            <li key={year} className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">{year}</span>
              <button
                onClick={() => handleRemoveYear(year)}
                className="text-red-600 hover:text-red-800"
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
