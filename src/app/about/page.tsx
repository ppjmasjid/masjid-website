"use client";
import Image from 'next/image';


import Breadcrumb from '@/components/Breadcrumb';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import React, { useState } from 'react';
const AboutPage = () => {
  const [user, setUser] = useState(null);
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="container mx-auto px-4 py-10">
     <Navbar className="fixed top-0 left-0 w-full z-50 bg-gray-600" />
  <Breadcrumb />
  <PageHeader location="contact" />

</div>
      

     
      {/* History Section */}
      <section className="flex flex-col-reverse md:flex-row items-center space-x-6 mb-16">
        <div className="flex-1">
          <h2 className="text-4xl font-semibold text-center md:text-left mb-4">History</h2>
          <p className="text-lg text-gray-700">
            The mosque was established in [year]. Its construction was a major milestone for the community, aiming to provide a space for worship, reflection, and community gathering. Over the years, it has grown to become a central part of our spiritual and social lives.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/images/history.jpg" // Adjust the image path as needed
            alt="History"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col md:flex-row items-center space-x-6 mb-16">
        <div className="flex-1">
          <Image
            src="/images/vision.jpg" // Adjust the image path as needed
            alt="Vision"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-4xl font-semibold text-center md:text-left mb-4">Vision</h2>
          <p className="text-lg text-gray-700">
            Our vision is to foster a strong and vibrant community that lives by the teachings of Islam, ensuring a space for spiritual growth, knowledge, and service to humanity. We aim to be a beacon of light and a place of tranquility for all.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col-reverse md:flex-row items-center space-x-6">
        <div className="flex-1">
          <h2 className="text-4xl font-semibold text-center md:text-left mb-4">Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to provide a welcoming environment for worship, community development, and educational programs. We strive to build a place that fosters spiritual, intellectual, and social growth among our congregation.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/images/mission.jpg" // Adjust the image path as needed
            alt="Mission"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
