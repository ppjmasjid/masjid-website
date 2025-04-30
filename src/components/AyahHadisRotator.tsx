"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ayahs = [
  "Indeed, with hardship comes ease. — Qur'an 94:6",
  "Allah! There is no deity except Him, the Ever-Living. — Qur'an 2:255",
  "So remember Me; I will remember you. — Qur'an 2:152",
];

const hadiths = [
  "The best among you are those who learn the Qur’an and teach it. — Bukhari",
  "Speak good or remain silent. — Bukhari",
  "A smile is charity. — Tirmidhi",
];

export default function AyahHadithRotator() {
  const [index, setIndex] = useState(0);
  const [showAyah, setShowAyah] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAyah((prev) => !prev);
      setIndex((prev) => (prev + 1) % Math.max(ayahs.length, hadiths.length));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentList = showAyah ? ayahs : hadiths;
  const content = currentList[index % currentList.length];
  const label = showAyah ? "Ayah" : "Hadith";

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:py-12 bg-white dark:bg-gray-900">
      <motion.div
        layout
        className="w-full max-w-xl p-6 text-center rounded-2xl shadow-md bg-gray-50 dark:bg-gray-800"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${label}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            layout
          >
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2">{label}</h2>
            <p className="text-base text-gray-800 dark:text-gray-300">{content}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
