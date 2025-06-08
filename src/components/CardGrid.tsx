"use client";



import {
  FaMosque,
  FaUsers,
  FaChalkboardTeacher,
  FaBullhorn,
  FaDonate,
  FaMusic,
  FaBookOpen,
  FaEnvelope,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
export default function ServiceSection() {
 const features = [
  {
    icon: <FaMosque className="text-5xl text-green-700 mx-auto mb-4" />,
    title: "About Masjid",
    desc: "Learn more about our mosque and its history.",
    link: "/about",
    button: "Learn More",
  },
  {
    icon: <FaUsers className="text-5xl text-green-700 mx-auto mb-4" />,
    title: "About Masjid Committee",
    desc: "Know more about our committee members.",
    link: "/committee",
    button: "Meet Committee",
  },
  {
    icon: <FaEnvelope className="text-5xl text-green-700 mx-auto mb-4" />,
    title: "Contact Us",
    desc: "Feel free to reach out to us.",
    link: "/contact",
    button: "Contact Now",
  },
  {
    icon: <FaChalkboardTeacher className="text-5xl text-green-700 mx-auto mb-4" />,
    title: "About Our Imam",
    desc: "Our Imam is a dedicated and knowledgeable leader.",
    link: "/imam",
    button: "Meet Imam",
  },
  {
    icon: <FaBullhorn className="text-5xl text-green-700 mx-auto mb-4" />,
    title: "Notice Board",
    desc: "Stay updated with the latest announcements.",
    link: "/notices",
    button: "View Notices",
  },
  {
    icon: <FaUsers className="text-5xl text-green-700 mx-auto mb-4" />,
    title: "Our Community Members",
    desc: "Meet our vibrant community members.",
    link: "/provider",
    button: "View Members",
  },
  {
    icon: <MdDashboard className="text-5xl text-green-700 mx-auto mb-4" />,
    title: "Dashboard",
    desc: "Our Financial Accounts and Reports are open for all.",
    link: "/dashboard",
    button: "View Dashboard",
  },
  {
    icon: <FaDonate className="text-5xl text-green-700 mx-auto mb-4" />,
    title: "Donate",
    desc: "Donate to support our mosque and its activities.",
    link: "/DonationPage",
    button: "Donate Now",
  },
  // {
  //   icon: <FaMusic className="text-5xl text-green-700 mx-auto mb-4" />,
  //   title: "Nashid",
  //   desc: "Listen to beautiful Islamic songs.",
  //   link: "/nashid",
  //   button: "Start Listening",
  // },
  // {
  //   icon: <FaBookOpen className="text-5xl text-green-700 mx-auto mb-4" />,
  //   title: "Library",
  //   desc: "Explore our collection of Islamic books and resources.",
  //   link: "/library",
  //   button: "Explore Library",
  // },
];

  return (
    <section id="services" className="py-16 bg-transparent text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800 animate-pulse">
          🌙 Our Islamic Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-100 to-white rounded-xl shadow-md p-6 text-center border-b-4 border-green-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.icon}
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
              <a
                href={service.link}
                className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
              >
                {service.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
