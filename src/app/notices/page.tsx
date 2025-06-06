'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firestore';
import Link from 'next/link';

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'notices'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotices(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-800 font-serif border-b-4 border-green-600 inline-block pb-2">
          🕌 All Notices
        </h1>
        <p className="text-green-700 mt-2 text-sm italic">Stay updated with the latest Islamic news and announcements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {notices.map((notice) => (
          <Link
            key={notice.id}
            href={`/notices/${notice.id}`}
            className="flex border rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden w-full h-[220px] max-h-[220px] bg-white ring-1 ring-green-200"
          >
            <div className="w-[40%] h-full">
              <img
                src={notice.imageUrl}
                alt={notice.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 w-[60%] flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-green-900 font-serif mb-1 line-clamp-2">
                  {notice.title}
                </h2>
                <p className="text-sm text-green-600">📅 {notice.date}</p>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">
                {notice.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
