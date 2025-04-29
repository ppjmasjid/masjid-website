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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📝 All Notices</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {notices.map((notice) => (
          <Link
            key={notice.id}
            href={`/notices/${notice.id}`}
            className="flex border rounded-lg shadow hover:shadow-lg transition overflow-hidden w-full h-[220px] max-h-[220px]"
          >
            <div className="w-[40%] h-full">
              <img
                src={notice.imageUrl}
                alt={notice.title}
                className="w-full h-full  object-cover"
              />
            </div>
            <div className="p-4 w-[60%] flex flex-col ">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                  {notice.title}
                </h2>
                <p className="text-sm text-gray-500 ">📅 {notice.date}</p>
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
