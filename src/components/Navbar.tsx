"use client";

import { useState, useEffect, useRef } from "react";

const Navbar = ({
  setNavHeight,
  className,
  darkMode,
}: {
  setNavHeight?: (height: number) => void;
  className?: string;
  darkMode?: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (headerRef.current && setNavHeight) {
      setNavHeight(headerRef.current.offsetHeight);
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY < lastScrollY || window.scrollY < 10);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setNavHeight]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 shadow-md ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      } ${className || (darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800")}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          পটুয়ার পার জামে মসজিদ
        </div>

        <nav
          className={`absolute md:relative top-full left-0 w-full md:w-auto md:flex md:items-center md:space-x-8 transition-all duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${darkMode ? "bg-gray-900 md:bg-transparent" : "bg-white md:bg-transparent"}`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 p-6 md:p-0">
            <li>
              <a
                href="/"
                className={`block py-2 px-4 ${
                  darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
                }`}
              >
                Home
              </a>
            </li>

            <li className="relative">
              <button
                onClick={toggleDropdown}
                className={`block py-2 px-4 w-full text-left md:w-auto ${
                  darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
                }`}
              >
                Learn Quran ▾
              </button>
              {dropdownOpen && (
                <ul
                  className={`absolute left-0 mt-2 space-y-1 rounded-md shadow-lg z-50 p-2 ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                  }`}
                >
                  <li>
                    <a
                      href="/learnquran/basic"
                      className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 rounded"
                    >
                      Basic
                    </a>
                  </li>
                  <li>
                    <a
                      href="/learnquran/advanced"
                      className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 rounded"
                    >
                      Advanced
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="/quran"
                className={`block py-2 px-4 ${
                  darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
                }`}
              >
                Read Quran
              </a>
            </li>
            <li>
              <a
                href="https://about.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`block py-2 px-4 ${
                  darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
                }`}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://blog.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`block py-2 px-4 ${
                  darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
                }`}
              >
                Blog
              </a>
            </li>
          </ul>

          <a
            href="/DonationPage"
            className="block mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-all duration-300 font-semibold"
          >
            দান করুন
          </a>
        </nav>

        <button
          onClick={toggleMenu}
          className="flex flex-col md:hidden z-50 relative"
          aria-expanded={isMenuOpen}
          aria-controls="navLinks"
        >
          <span
            className={`w-6 h-0.5 transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            } ${darkMode ? "bg-white" : "bg-gray-800"}`}
          ></span>
          <span
            className={`w-6 h-0.5 my-1 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            } ${darkMode ? "bg-white" : "bg-gray-800"}`}
          ></span>
          <span
            className={`w-6 h-0.5 transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            } ${darkMode ? "bg-white" : "bg-gray-800"}`}
          ></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
