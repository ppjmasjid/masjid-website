"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Slideshow from "@/components/Slideshow";
 
import PrayerTimes from "@/components/PrayerTime";
import ServiceSection from "@/components/ServiceSection";
import Footer from "@/components/Footer";
import Calendar  from "@/components/Calendar";
import NoticeCard  from "@/components/NoticeCard";

import { Amiri } from 'next/font/google';
import AyahHadisRotator from "@/components/AyahHadisRotator";
const amiri = Amiri({ subsets: ['arabic'], weight: '400' });
import CardGrid, { SimpleCard } from "@/components/CardGrid";


const data: SimpleCard[] = [

  {
    title: "About Masjid",
    description: " Learn more about our mosque and its history.",
    href: " /about",
    external: true,
    // image: "/images/donate.jpg",
  },
  {
    title: "About Masjid Committee", 
    description: "Know more about our committee members.",
    href: "/committee",
    // image: "/images/prayer.jpg",
  },  
  {
    title: "Contact Us",
    description: "Feel free to reach out to us.",
    href: "/contact",
    // image: "/images/prayer.jpg",
  },
  {
    title: "About Our Imam",
    description: "Our Imam is a dedicated and knowledgeable leader.",
    href: "/imam",
  
  },
  {
    title: "Notice Board",
    description: "Stay updated with the latest announcements.",
    href: "/notices",
  
  },
  {
    title: "Our Community Members",
    description: "Meet our vibrant community members.",
    href: "/provider",
  
  },
  {
    title: "Dashboard",
    description: "Our Financial Accounts and Reports are open for all.",
    href: "/dashboard",
  
  },
  {
    title: "Donate",
    description: "Donate to support our mosque and its activities.",
    href: "/DonationPage",
  
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  return (
    
    <div className={`${amiri.className} ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
     
     
     
      {/* Global Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition"
        >
          {darkMode ? "🌙 Dark Mode" : "💡 Light Mode"}
        </button>
      </div>

      <Navbar setNavHeight={setNavHeight} darkMode={darkMode} />

      <Slideshow navHeight={navHeight} />

       <AyahHadisRotator />
      <div className="flex flex-col lg:flex-row gap-6">
        

        {/* Islamic Calendar */}
        <div className="lg:w-2/3 w-full">
          <Calendar />
        </div>
        {/* Prayer Times */}
        <div className="lg:w-1/3 w-full">
          <PrayerTimes />
        </div>
      </div>
      <NoticeCard />
      <CardGrid cards={data} />;
      <Footer />
    </div>
  );
}
