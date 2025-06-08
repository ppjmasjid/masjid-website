"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const quotes = [
  {
    text: "❝Those who spend in charity, by night and by day, in secret and in public, shall have their reward with their Lord.❞",
    source: "— Surah Al-Baqarah 2:274",
  },
  {
    text: "❝Charity does not decrease wealth.❞",
    source: "— Prophet Muhammad ﷺ (Muslim)",
  },
  {
    text: "❝The believer’s shade on the Day of Resurrection will be his charity.❞",
    source: "— Prophet Muhammad ﷺ (Tirmidhi)",
  },
];

const DonationPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen  bg-gradient-to-b from-green-50 to-white  text-green-900   dark:text-green-200 transition-colors duration-700 font-serif">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="text-center border-b-4 border-green-700 pb-6">
          <h1 className="text-5xl font-extrabold text-green-500 dark:text-green-300 tracking-wide drop-shadow-md">
            🕌 Donate to Patuarpur jame Masjid
          </h1>
          <p className="mt-3 text-lg text-green-700 dark:text-green-200 italic">
            Help us maintain and expand our services to the community.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-3 print:hidden">
          <button
            onClick={toggleDarkMode}
            className="px-5 py-2 rounded-lg bg-green-300 dark:bg-green-700 text-green-900 dark:text-green-100 font-semibold shadow hover:bg-green-300 dark:hover:bg-green-600 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-lg bg-green-800 dark:bg-green-600 text-white font-semibold shadow hover:bg-green-900 dark:hover:bg-green-700 transition"
            aria-label="Print or save as PDF"
          >
            🖨️ Print / Save as PDF
          </button>
        </div>

        {/* Donation Methods */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 border-l-8 border-green-700 pl-4 mb-6 drop-shadow-sm">
            💳 Ways of Donating
          </h2>

          {[
            {
              title: "📞 By Telephone",
              content: (
                <p className="text-green-900 dark:text-green-100">
                  Call: <span className="font-mono bg-green-900 dark:bg-green-800 px-1 rounded">{`88-02222263243`}</span>
                </p>
              ),
            },
            {
              title: "💵 By Cash",
              content: (
                <>
                  <p className="text-green-900 dark:text-green-100">Pay at the Reception:</p>
                  <p className="text-green-800 dark:text-green-200 italic">
                    Gulshan Central Masjid, 111, Gulshan Avenue, Gulshan Model Town, Dhaka-1212
                  </p>
                </>
              ),
            },
            {
              title: "✉️ By Post",
              content: (
                <>
                  <p className="text-green-900 dark:text-green-100">
                    Cheque Payable to:{" "}
                    <strong className="underline decoration-green-600 dark:decoration-green-400">
                      ‘Gulshan Central Masjid & Iddgah Society’
                    </strong>
                  </p>
                  <p className="text-green-800 dark:text-green-200 italic">
                    Address: 111, Gulshan Avenue, Gulshan Model Town, Dhaka-1212
                  </p>
                </>
              ),
            },
            {
              title: "🏦 By Bank Transfer",
              content: (
                <ul className="list-disc pl-6 space-y-1 text-green-900 dark:text-green-100">
                  <li>
                    <strong>Account No:</strong> 00713100065688
                  </li>
                  <li>
                    <strong>SWIFT:</strong> EXBKBDDHX007
                  </li>
                  <li>
                    <strong>Bank:</strong> Export Import Bank of Bangladesh Limited
                  </li>
                  <li>
                    <strong>Branch:</strong> Gulshan Branch, Dhaka
                  </li>
                </ul>
              ),
            },
          ].map((method, idx) => (
            <div
              key={idx}
              className=" dark:bg-green-800 rounded-2xl p-5 shadow-lg border border-green-200 dark:border-green-700 transition"
            >
              <h3 className="font-bold text-xl text-green-700 dark:text-green-300 mb-2">{method.title}</h3>
              <div>{method.content}</div>
            </div>
          ))}
        </section>

        {/* QR Code */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 border-l-8 border-green-700 pl-4 mb-6 drop-shadow-sm">
            📱 Mobile Payment (QR Code)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { src: "/images/bkash.png", alt: "bKash QR", label: "bKash" },
              { src: "/images/nagad.png", alt: "Nagad QR", label: "Nagad" },
            ].map((qr, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white dark:bg-green-900 border border-green-300 dark:border-green-600 rounded-3xl p-6 shadow-md"
              >
                <Image src={qr.src} alt={qr.alt} width={160} height={160} />
                <p className="mt-3 text-center text-green-900 dark:text-green-100 font-semibold">
                  Scan to donate via <span className="underline">{qr.label}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Motivation Section */}
        <section className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 rounded-3xl p-8 shadow-inner transition duration-700">
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-6 drop-shadow-md">
            🌙 Motivation from the Qur’an & Sunnah
          </h2>
          <blockquote className="italic border-l-8 pl-6 border-green-600 dark:border-green-400 text-green-900 dark:text-green-100 leading-relaxed tracking-wide">
            {quotes[quoteIndex].text}
            <span className="block text-right font-semibold mt-4 text-green-700 dark:text-green-200">
              {quotes[quoteIndex].source}
            </span>
          </blockquote>
        </section>
      </div>
    </div>
  );
};

export default DonationPage;
