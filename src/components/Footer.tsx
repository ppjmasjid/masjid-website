"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa";

// Footer.tsx
export default function Footer() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className=" text-white bg-gradient-to-b from-emerald-900 to-emerald-800  ">
            {/* Main Footer Section */}
            <div className=" max-w-7xl mx-auto py-10 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Logo and Social Icons */}
                <div>
                    {/* Logo */}
                    <div className="flex items-center space-x-2 ">
                        <img src="/logo.png" alt="Logo" className="w-20 h-20 rounded-full bg-white" />
                        <h2 className="text-xl font-bold">পূর্ব পাটুয়ার পাড় জামে মসজিদ</h2>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-6 flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                            <FaFacebookF className="text-2xl" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                            <FaTwitter className="text-2xl" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                            <FaLinkedinIn className="text-2xl" />
                        </a>
                    </div>
                </div>

                {/* Middle Column: Useful Links */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Useful Links</h2>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-blue-500 transition">Home</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition">About</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition">Education & Training</a></li>
                        <li><a href="/login" className="hover:text-blue-500 transition">login</a></li>
                    </ul>
                </div>

                {/* Right Column: Donation Now */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Donate Now</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Zakat is an Islamic financial term. As one of the pillars of the faith, it requires all Muslims to donate a portion of their wealth to charity.
                    </p>
                    <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition">
                        Donate Now
                    </button>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="bg-gradient-to-b from-emerald-900 to-emerald-900  text-gray-400 py-4 px-4 md:px-8 text-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <p>© {new Date().getFullYear()} PPJM. All Rights Reserved.</p>
                    <p>Design & developed by <a href="/imam">MOTASIM BILLAH SIAM</a></p>
                </div>
            </div>

            {/* Back to Top Button */}
            {
                showTopBtn && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition"
                    >
                        <FaArrowUp className="text-white text-lg" />
                    </button>
                )
            }
        </footer>
    );
}