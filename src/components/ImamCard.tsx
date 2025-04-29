'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

interface Imam {
  id: string;
  name: string;
  subheading: string;
  imageUrl: string;
  resume: React.ReactNode;
}

interface ImamCardProps {
  imam: Imam;
}

export default function ImamCard({ imam }: ImamCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1 p-4 flex flex-col items-center text-center"
      >
        <div className="w-32 h-32 relative mb-4">
          <Image
            src={imam.imageUrl}
            alt={imam.name}
            fill
            className="rounded-full object-cover border-4 border-gray-200 shadow-md hover:scale-105 transition-transform"
          />
        </div>
        <h2 className="text-lg font-semibold">{imam.name}</h2>
        <p className="text-gray-500">{imam.subheading}</p>
      </div>

      {/* Popup Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-auto">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row gap-8 mt-8">
              {/* Left: Image */}
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <div className="w-60 h-60 relative">
                  <Image
                    src={imam.imageUrl}
                    alt={imam.name}
                    fill
                    className="rounded-xl object-cover border-4 border-gray-300 shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Right: Resume */}
              <div className="flex-1 overflow-y-auto">
                <h2 className="text-3xl font-bold mb-2">{imam.name}</h2>
                <p className="text-gray-500 mb-6">{imam.subheading}</p>
                <div className="prose max-w-none">{imam.resume}</div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
