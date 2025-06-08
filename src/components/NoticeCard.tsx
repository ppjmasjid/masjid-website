'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/utils/firestore';
import Link from 'next/link';

export default function LatestNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(1);

  // Detect screen width and set visible cards
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    const fetchLatest = async () => {
      const q = query(collection(db, 'notices'), orderBy('date', 'desc'), limit(5));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotices(data);
    };
    fetchLatest();
  }, []);

  return (
    <div>
      {/* Title and See More */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">📢 Latest Notices</h2>
        <Link
          href="/notices"
          className="text-sm text-blue-600 hover:underline"
        >
          See more →
        </Link>
      </div>

      {/* Render limited cards based on screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notices.slice(0, visibleCount).map((notice) => (
          <Link
            key={notice.id}
            href={`/notices/${notice.id}`}
            className="block border p-4 rounded hover:shadow-lg"
          >
            <img
              src={notice.imageUrl}
              alt={notice.title}
              className="h-40 w-full object-cover mb-2 rounded"
            />
            <h3 className="font-semibold text-lg">{notice.title}</h3>
            <p className="text-gray-500 text-sm">{notice.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
