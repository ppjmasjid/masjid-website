'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firestore';

interface Notice {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function NoticeDetailPage() {
  const { id } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const docRef = doc(db, 'notices', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNotice(docSnap.data() as Notice);
        }
      } catch (error) {
        console.error('Error fetching notice:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchNotice();
  }, [id]);

  if (loading || !notice) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-green-100 text-xl font-serif">
        Loading notice...
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-black font-serif px-4 py-10 sm:px-8">
      {/* Decorative icon - top left */}
      <div
        className="fixed top-6 left-6 text-green-300 opacity-40 select-none pointer-events-none"
        aria-hidden="true"
        style={{ fontSize: '4rem' }}
      >
        ☾ <span className="ml-1">★</span>
      </div>

      <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-green-200 p-6 sm:p-10">
        {/* Notice Image */}
        <img
          src={notice.imageUrl}
          alt={notice.title}
          className="w-full h-64 sm:h-80 object-cover rounded-xl border border-green-300 shadow-inner mb-6"
          loading="lazy"
        />

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4 border-b-4 border-green-300 pb-2 drop-shadow-sm tracking-wide">
          {notice.title}
        </h1>

        {/* Date */}
        <time className="block text-green-700 italic text-base mb-8">{notice.date}</time>

        {/* Description */}
        <div className="prose prose-green prose-lg max-w-none text-green-800 leading-relaxed">
          <p>{notice.description}</p>
        </div>
      </article>

      {/* Decorative icon - bottom right */}
      <div
        className="fixed bottom-6 right-6 text-green-300 opacity-30 select-none pointer-events-none"
        aria-hidden="true"
        style={{ fontSize: '5rem' }}
      >
        ★ <span className="ml-1">☾</span>
      </div>
    </main>
  );
}
