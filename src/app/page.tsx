"use client";

import { useState, useEffect } from "react";
 
import Slideshow from "@/components/Slideshow";

import PrayerTimes from "@/components/PrayerTime";
import ServiceSection from "@/components/ServiceSection";
 
import Calendar from "@/components/Calendar";
import NoticeCard from "@/components/NoticeCard";

import { Amiri } from "next/font/google";
import AyahHadisRotator from "@/components/AyahHadisRotator";
import CardGrid from "@/components/CardGrid";

const amiri = Amiri({ subsets: ["arabic"], weight: "400" });

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
 

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  return (
    <div
      className={`${amiri.className} ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-700 ease-in-out`}
    >
      {/* Global Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-20">
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="p-3 bg-green-700 dark:bg-yellow-600 rounded-full shadow-lg hover:bg-green-800 dark:hover:bg-yellow-500 transition focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-yellow-300"
        >
          {darkMode ? "🌙 Dark Mode" : "💡 Light Mode"}
        </button>
      </div>

      {/* Navbar */}
       

      {/* Slideshow */}
      <div className="relative z-10">
        <Slideshow />
      </div>

      {/* Ayah & Hadis Rotator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AyahHadisRotator />
      </div>

      {/* Calendar & Prayer Times Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 mb-12">
        {/* Calendar */}
        <section
          aria-label="Islamic Calendar"
          className="lg:w-2/3 w-full rounded-3xl bg-gradient-to-tr from-green-50 via-green-100 to-green-200 dark:from-green-900 dark:via-green-800 dark:to-green-900 shadow-xl p-6"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, #d1e7dd 10%, transparent 30%), radial-gradient(circle at bottom right, #badbcc 20%, transparent 40%)",
          }}
        >
          <Calendar />
        </section>

        {/* Prayer Times */}
        <section
          aria-label="Prayer Times"
          className="lg:w-1/3 w-full rounded-3xl bg-gradient-to-tr from-yellow-50 via-yellow-100 to-yellow-200 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-900 shadow-xl p-6"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, #fff3cd 10%, transparent 30%), radial-gradient(circle at bottom right, #ffe8a1 20%, transparent 40%)",
          }}
        >
          <PrayerTimes />
        </section>
      </div>

      {/* Notice Board */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <NoticeCard />
      </div>

      {/* Card Grid (Services / Features) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CardGrid />
      </div>

      {/* Footer */}
     
    </div>
  );
}
