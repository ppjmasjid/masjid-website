'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/utils/firestore';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
}

export default function LatestNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);

  // Responsive layout based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Fetch latest notices
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const q = query(collection(db, 'notices'), orderBy('date', 'desc'), limit(5));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Notice, 'id'>),
        }));
        setNotices(data);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  return (
    <section className="p-4 bg-transperant  rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-800 font-serif">
          📢 Latest Notices
        </h2>
        <Link href="/notices" className="text-sm text-green-600 hover:underline font-medium">
          See more →
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-green-700 italic">Loading notices...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {notices.slice(0, visibleCount).map((notice) => (
            <Link
              key={notice.id}
              href={`/notices/${notice.id}`}
              className="group bg-gradient-to-br from-white to-green-50 border border-green-200 rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={notice.imageUrl}
                alt={notice.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 bg-green-200">
                <h3 className="text-lg font-semibold text-green-900 font-serif line-clamp-2 mb-1">
                  {notice.title}
                </h3>
                <p className="text-sm text-gray-500">📅 {notice.date}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
