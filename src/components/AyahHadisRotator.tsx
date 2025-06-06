"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = {
  text: string;
  source: string;
};

const ayahs: Item[] = [
  { text: "Indeed, with hardship comes ease.", source: "— Qur'an 94:6" },
  { text: "Allah! There is no deity except Him, the Ever-Living.", source: "— Qur'an 2:255" },
  { text: "So remember Me; I will remember you.", source: "— Qur'an 2:152" },
];

const hadiths: Item[] = [
  { text: "The best among you are those who learn the Qur’an and teach it.", source: "— Bukhari" },
  { text: "Speak good or remain silent.", source: "— Bukhari" },
  { text: "A smile is charity.", source: "— Tirmidhi" },
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
  const item = currentList[index % currentList.length];

  const title = showAyah
    ? "🌿 Motivation from the Qur’an"
    : "📜 Motivation from the Sunnah";

  return (
    <section className="w-full bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-600 rounded-xl p-6 transition duration-500">
      <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-4">
        {title}
      </h2>
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={`${title}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="italic border-l-4 pl-4 border-green-500 text-gray-800 dark:text-gray-200 transition"
        >
          {item.text}
          <span className="block text-right font-semibold mt-2">{item.source}</span>
        </motion.blockquote>
      </AnimatePresence>
    </section>
  );
}
