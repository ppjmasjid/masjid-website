"use client";
import Image from 'next/image';
import React, { useState } from 'react';

const AboutPage = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="  mx-auto px-4 py-10 bg-gradient-to-br from-green-50 via-white to-green-100 text-[#0f172a] rounded-xl shadow-lg">
      {/* History Section */}
      <section className="flex flex-col-reverse md:flex-row items-center md:space-x-6 mb-16 border border-green-200 p-6 rounded-lg bg-white shadow-md">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-800 text-center md:text-left mb-4 mt-5 border-b-2 border-green-400 pb-2">📜 History</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The mosque was established in [year]. Its construction was a major milestone for the community, aiming to provide a space for worship, reflection, and community gathering. Over the years, it has grown to become a central part of our spiritual and social lives.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/images/history.jpg"
            alt="History"
            width={500}
            height={300}
            className="rounded-lg shadow-lg ring-2 ring-green-400"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col md:flex-row items-center md:space-x-6 mb-16 border border-green-200 p-6 rounded-lg bg-white shadow-md">
        <div className="flex-1">
          <Image
            src="/images/vision.jpg"
            alt="Vision"
            width={500}
            height={300}
            className="rounded-lg shadow-lg ring-2 ring-green-400"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-4xl mt-5 font-bold text-green-800 text-center md:text-left mb-4 border-b-2 border-green-400 pb-2">🌙 Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our vision is to foster a strong and vibrant community that lives by the teachings of Islam, ensuring a space for spiritual growth, knowledge, and service to humanity. We aim to be a beacon of light and a place of tranquility for all.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col-reverse md:flex-row items-center md:space-x-6 border border-green-200 p-6 rounded-lg bg-white shadow-md">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-green-800 mt-4 text-center md:text-left mb-4 border-b-2 border-green-400 pb-2">🤲 Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to provide a welcoming environment for worship, community development, and educational programs. We strive to build a place that fosters spiritual, intellectual, and social growth among our congregation.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/images/mission.jpg"
            alt="Mission"
            width={500}
            height={300}
            className="rounded-lg shadow-lg ring-2 ring-green-400"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
