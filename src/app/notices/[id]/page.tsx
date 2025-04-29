'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firestore';
import Breadcrumb from '@/components/Breadcrumb';
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

  if (!notice) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Breadcrumb/>
      <img src={notice.imageUrl} className="w-full h-60 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{notice.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{notice.date}</p>
      <p className="text-gray-700">{notice.description}</p>
    </div>
  );
}
