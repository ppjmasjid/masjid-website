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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <Link
            key={notice.id}
            href={`/notices/${notice.id}`}
            className="group bg-white rounded-2xl border border-yellow-200 ring-2 ring-green-200 hover:ring-yellow-300 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <img
                src={notice.imageUrl}
                alt={notice.title}
                className="h-full w-full object-cover rounded-t-2xl"
              />
              <div className="absolute bottom-2 right-2 bg-white text-green-700 text-xs px-2 py-1 rounded shadow ring-1 ring-green-300">
                📅 {notice.date}
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between grow bg-gradient-to-t from-white via-green-50 to-white">
              <h2 className="text-lg font-semibold text-green-900 font-serif mb-2 line-clamp-2">
                {notice.title}
              </h2>
              <p className="text-sm text-gray-700 italic mb-3 line-clamp-3">
                {notice.description}
              </p>
              <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                🔗 <span className="underline group-hover:text-yellow-600">Read More</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
