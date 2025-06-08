// components/PageHeader.tsx
import React from "react";

type HeaderItem = {
  heading: string;
  subheading: string;
  location: string;
};

// Static array of all headers
const pageHeaders: HeaderItem[] = [
  {
    location: "contact",
    heading: "Welcome to Our Mosque",
    subheading:
      "A place of worship, community, and tranquility. Join us in our journey to grow spiritually and live by the teachings of Islam.",
  },
  {
    location: "about",
    heading: "About Us",
    subheading: "Learn more about our mission, vision, and the community we serve.",
  },
  {
    location: "services",
    heading: "Our Services",
    subheading: "From daily prayers to community programs, we offer a variety of services for all.",
  },
];

type Props = {
  location: string;
};

const PageHeader: React.FC<Props> = ({ location }) => {
  const content = pageHeaders.find((item) => item.location === location);

  if (!content) return null; // Optional: fallback UI

  return (
    <div className="bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-600 py-20 px-4 text-white text-center">
      <div className="container mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{content.heading}</h1>
        <p className="text-md md:text-xl max-w-3xl mx-auto">{content.subheading}</p>
      </div>
    </div>
  );
};

export default PageHeader;
