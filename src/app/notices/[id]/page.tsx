'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firestore';

export default function NoticeDetailPage() {
  const { id } = useParams();
  const [notice, setNotice] = useState<any>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      const docRef = doc(db, 'notices', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setNotice(docSnap.data());
      }
    };
    fetchNotice();
  }, [id]);

  if (!notice)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-green-100 font-amiri text-lg">
        Loading...
      </div>
    );

  return (
    <main
      className="relative min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-green-100 text-black 
      flex flex-col items-center justify-start p-8 text-green-50 font-amiri overflow-auto"
      style={{ fontFamily: "'Amiri', serif" }}
    >
      {/* Decorative crescent and star top-left */}
      <div
        className="fixed top-6 left-6 text-green-300 opacity-40 select-none pointer-events-none"
        style={{ fontSize: '4rem', lineHeight: 1 }}
        aria-hidden="true"
      >
        <span>☾</span>
        <span className="ml-1">★</span>
      </div>

      <article
        className="max-w-3xl w-full bg-gradient-to-br from-green-50 via-white to-green-100 text-black  rounded-3xl border-2 border-green-300/40
        shadow-lg p-8"
        style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
      >
        {/* Notice image */}
        <img
          src={notice.imageUrl}
          alt={notice.title}
          className="w-full h-72 object-cover rounded-xl border-4 border-green-300/50 shadow-inner mb-8"
          loading="lazy"
        />

        {/* Title */}
        <h1
          className="text-5xl font-bold text-green-900 mb-4 border-b-4 border-green-300 pb-2 tracking-wider
          drop-shadow-md   font-serif"
        >
          {notice.title}
        </h1>

        {/* Date */}
        <p className="text-green-150 italic mb-8 text-lg tracking-wide">{notice.date}</p>

        {/* Description */}
        <article className="prose prose-green prose-lg max-w-none leading-relaxed text-green-150">
          <p>{notice.description}</p>
        </article>
      </article>

      {/* Decorative crescent and star bottom-right */}
      <div
        className="fixed bottom-6 right-6 text-green-300 opacity-20 select-none pointer-events-none"
        style={{ fontSize: '5rem', lineHeight: 1 }}
        aria-hidden="true"
      >
        <span>★</span>
        <span className="ml-1">☾</span>
      </div>
    </main>
  );
}
