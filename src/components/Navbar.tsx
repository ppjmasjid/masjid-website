
"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const Navbar = ({ setNavHeight, className }: { setNavHeight?: (height: number) => void; className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (headerRef.current && setNavHeight) {
      setNavHeight(headerRef.current.offsetHeight);
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setNavHeight]);

  const navItems = [
    { label: "Home", link: "/" },
    {
      label: "Learn Quran",
      submenu: [
        { label: "With text course", link: "/learnquran/" },
        { label: "With video course", link: "/learnquranwithvideo/" },
      ],
    },




   
   


    {
      label: "Useful links",
      submenu: [


        { label: "Nashid", link: "/nashid" },
        { label: "Rukaya", link: "/rokayah" },
        { label: "Islamic Q&A", link: "/qa" },
        { label: "Large Online Library", link: "/library" },
        { label: " Namaj & deeds Tracker", link: "/tracker" },
         { label: "Blog", link: "/blogs" },
          { label: "Read Quran", link: "/quran" },

      ],
    },

    {
      label: "Resources",
      submenu: [
        { label: "Contact Us", link: "/Contactus" },
        { label: "About Us", link: "/about-us" },

     

      ],
    },


    //Contactus ,copyright,disclaimer
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full bg-gradient-to-r from-emerald-900 to-emerald-700 text-white shadow-lg transition-transform duration-500 z-50 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"} ${className}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold tracking-wide font-serif text-yellow-300">পূর্ব পাটুয়ার পাড় জামে মসজিদ</div>

        {/* Nav Menu */}
        <nav
          className={`absolute md:relative top-full left-0 w-full md:w-auto md:flex md:items-center transition-transform duration-300 ease-in-out bg-emerald-900 md:bg-transparent ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 p-6 md:p-0">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center gap-1 py-2 px-4 hover:text-yellow-300 focus:outline-none"
                    >
                      {item.label}
                      <FaChevronDown
                        className={`text-sm transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>
                    <ul
                      className={`overflow-hidden transition-all duration-300 bg-emerald-800 rounded-md shadow-md md:absolute md:min-w-[180px] md:top-full md:left-0 ${openDropdown === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      {item.submenu.map((sub) => (
                        <li key={sub.label}>
                          <a
                            href={sub.link}
                            className="block px-4 py-2 text-sm hover:bg-emerald-700 text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>



                  </>
                ) : (
                  <a
                    href={item.link}
                    className="block py-2 px-4 hover:text-yellow-300"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <a
            href="/DonationPage"
            className="block mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-all duration-300 font-semibold"
          >             দান করুন
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="flex flex-col md:hidden z-50 relative"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="navLinks"
        >
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white my-1 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

















// "use client";

// import { useState, useEffect, useRef } from "react";

// const Navbar = ({
//   setNavHeight,
//   className,
//   darkMode,
// }: {
//   setNavHeight?: (height: number) => void;
//   className?: string;
//   darkMode?: boolean;
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const headerRef = useRef<HTMLDivElement | null>(null);

//   const toggleMenu = () => setIsMenuOpen((prev) => !prev);
//   const toggleDropdown = () => setDropdownOpen((prev) => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         headerRef.current &&
//         !headerRef.current.contains(event.target as Node)
//       ) {
//         setIsMenuOpen(false);
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (headerRef.current && setNavHeight) {
//       setNavHeight(headerRef.current.offsetHeight);
//     }

//     let lastScrollY = window.scrollY;
//     const handleScroll = () => {
//       setIsHeaderVisible(window.scrollY < lastScrollY || window.scrollY < 10);
//       lastScrollY = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [setNavHeight]);

//   return (
//     <header
//       ref={headerRef}
//       className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 shadow-md ${
//         isHeaderVisible ? "translate-y-0" : "-translate-y-full"
//       } ${className || (darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800")}`}
//     >
//       <div className="container mx-auto flex items-center justify-between px-6 py-4">
//         <div className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
//           পটুয়ার পার জামে মসজিদ
//         </div>

//         <nav
//           className={`absolute md:relative top-full left-0 w-full md:w-auto md:flex md:items-center md:space-x-8 transition-all duration-300 ease-in-out
//           ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//           ${darkMode ? "bg-gray-900 md:bg-transparent" : "bg-white md:bg-transparent"}`}
//         >
//           <ul className="flex flex-col md:flex-row md:space-x-8 p-6 md:p-0">
//             <li>
//               <a
//                 href="/"
//                 className={`block py-2 px-4 ${
//                   darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
//                 }`}
//               >
//                 Home
//               </a>
//             </li>

//             <li className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className={`block py-2 px-4 w-full text-left md:w-auto ${
//                   darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
//                 }`}
//               >
//                 Learn Quran ▾
//               </button>
//               {dropdownOpen && (
//                 <ul
//                   className={`absolute left-0 mt-2 space-y-1 rounded-md shadow-lg z-50 p-2 ${
//                     darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
//                   }`}
//                 >
//                   <li>
//                     <a
//                       href="/learnquran/basic"
//                       className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 rounded"
//                     >
//                       Basic
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/learnquran/advanced"
//                       className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 rounded"
//                     >
//                       Advanced
//                     </a>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             <li>
//               <a
//                 href="/quran"
//                 className={`block py-2 px-4 ${
//                   darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
//                 }`}
//               >
//                 Read Quran
//               </a>
//             </li>
//             <li>
//               <a
//                 href="https://about.example.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`block py-2 px-4 ${
//                   darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
//                 }`}
//               >
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a
//                 href="https://blog.example.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`block py-2 px-4 ${
//                   darkMode ? "text-white hover:text-indigo-300" : "text-gray-800 hover:text-indigo-500"
//                 }`}
//               >
//                 Blog
//               </a>
//             </li>
//           </ul>

//           <a
//             href="/DonationPage"
//             className="block mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-all duration-300 font-semibold"
//           >
//             দান করুন
//           </a>
//         </nav>

//         <button
//           onClick={toggleMenu}
//           className="flex flex-col md:hidden z-50 relative"
//           aria-expanded={isMenuOpen}
//           aria-controls="navLinks"
//         >
//           <span
//             className={`w-6 h-0.5 transition-transform duration-300 ${
//               isMenuOpen ? "rotate-45 translate-y-2" : ""
//             } ${darkMode ? "bg-white" : "bg-gray-800"}`}
//           ></span>
//           <span
//             className={`w-6 h-0.5 my-1 transition-opacity duration-300 ${
//               isMenuOpen ? "opacity-0" : ""
//             } ${darkMode ? "bg-white" : "bg-gray-800"}`}
//           ></span>
//           <span
//             className={`w-6 h-0.5 transition-transform duration-300 ${
//               isMenuOpen ? "-rotate-45 -translate-y-2" : ""
//             } ${darkMode ? "bg-white" : "bg-gray-800"}`}
//           ></span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
