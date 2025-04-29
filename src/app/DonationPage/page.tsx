"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
 import Footer from "@/components/Footer";
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
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-400">
            🕌 Donate to Gulshan Central Masjid
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Help us maintain and expand our services to the community.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-2 print:hidden">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            🖨️ Print / Save as PDF
          </button>
        </div>

        {/* Donation Methods */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            💳 Ways of Donating
          </h2>

          {[
            {
              title: "📞 By Telephone",
              content: <p>Call: <span className="font-mono">88-02222263243</span></p>,
            },
            {
              title: "💵 By Cash",
              content: (
                <>
                  <p>Pay at the Reception:</p>
                  <p>Gulshan Central Masjid, 111, Gulshan Avenue, Gulshan Model Town, Dhaka-1212</p>
                </>
              ),
            },
            {
              title: "✉️ By Post",
              content: (
                <>
                  <p>Cheque Payable to: <strong>‘Gulshan Central Masjid & Iddgah Society’</strong></p>
                  <p>Address: 111, Gulshan Avenue, Gulshan Model Town, Dhaka-1212</p>
                </>
              ),
            },
            {
              title: "🏦 By Bank Transfer",
              content: (
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Account No:</strong> 00713100065688</li>
                  <li><strong>SWIFT:</strong> EXBKBDDHX007</li>
                  <li><strong>Bank:</strong> Export Import Bank of Bangladesh Limited</li>
                  <li><strong>Branch:</strong> Gulshan Branch, Dhaka</li>
                </ul>
              ),
            },
          ].map((method, idx) => (
            <div key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-bold text-lg">{method.title}</h3>
              <div className="mt-1 text-gray-700 dark:text-gray-200">{method.content}</div>
            </div>
          ))}
        </section>

        {/* QR Code */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pink-800 dark:text-pink-400">
            📱 Mobile Payment (QR Code)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { src: "/images/bkash.png", alt: "bKash QR", label: "bKash" },
              { src: "/images/nagad.png", alt: "Nagad QR", label: "Nagad" },
            ].map((qr, i) => (
              <div key={i} className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-4">
                <Image src={qr.src} alt={qr.alt} width={160} height={160} />
                <p className="mt-2 text-center text-gray-800 dark:text-gray-200">
                  Scan to donate via <strong>{qr.label}</strong>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Motivation Section */}
        <section className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-600 rounded-xl p-6 transition duration-500">
          <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-4">
            🌙 Motivation from the Qur’an & Sunnah
          </h2>
          <blockquote className="italic border-l-4 pl-4 border-green-500 text-gray-800 dark:text-gray-200 transition">
            {quotes[quoteIndex].text}
            <span className="block text-right font-semibold mt-2">{quotes[quoteIndex].source}</span>
          </blockquote>
        </section>
        <Footer/>
      </div>
    </div>
  );
};

export default DonationPage;
