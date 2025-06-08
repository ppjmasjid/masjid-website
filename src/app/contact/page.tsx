'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import '@/app/globals.css'; // Make sure global styles include Arabic/Islamic fonts if used

const ContactPage = () => {
  return (
    <div className=" text-black mx-auto px-4 py-10 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen font-[Cairo]">
      <div className="container mx-auto px-4 py-10">
       
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center  text-emerald-800 border-b-4 border-green-600 inline-block pb-2">
        Contact Us
      </h1>

      {/* Contact Form */}
      <form
        action="https://formsubmit.co/m.b.siam2008@gmail.com"
        method="POST"
        className="max-w-2xl mx-auto space-y-6 bg-white text-gray-800 p-8 rounded-3xl shadow-2xl border border-green-300"
      >
        <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />
        <input type="hidden" name="_captcha" value="false" />

        <div>
          <label htmlFor="name" className="block text-lg mb-1 font-semibold text-green-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
            required
            className="w-full p-3 border border-green-300 rounded-lg bg-green-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg mb-1 font-semibold text-green-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            className="w-full p-3 border border-green-300 rounded-lg bg-green-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-lg mb-1 font-semibold text-green-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+880 1XXXXXXXXX"
            className="w-full p-3 border border-green-300 rounded-lg bg-green-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg mb-1 font-semibold text-green-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Write your message here..."
            className="w-full p-3 border border-green-300 rounded-lg bg-green-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full p-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition duration-300"
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Contact Info Cards */}
      <h1 className="text-4xl font-bold text-center mb-8 mt-16 text-emerald-800 border-b-4 border-green-600 inline-block pb-2">
        Contact Information
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-300 flex items-center space-x-4">
          <Mail className="text-green-600 w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold">Email Address</h3>
            <p className="text-gray-600">info@yourmosque.com</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-300 flex items-center space-x-4">
          <MapPin className="text-green-600 w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold">Mosque Address</h3>
            <p className="text-gray-600">123 Mosque Street, Dhaka, Bangladesh</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-300 flex items-center space-x-4">
          <Phone className="text-green-600 w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p className="text-gray-600">+880 1XXXXXXXXX</p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <section>
        <h3 className="text-3xl font-semibold text-center mb-6 text-emerald-800">
          Our Location
        </h3>
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border-2 border-green-400">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1178.3254991840993!2d90.71878854652024!3d23.950758755616327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375431319032f851%3A0xc66d42ab07747e79!2z4Kaq4Ka-4Kaf4KeB4Kef4Ka-4KawIOCmquCmvuCnnCDgppzgpr7gpq7gp4cg4Kau4Ka44Kac4Ka_4Kam!5e1!3m2!1sbn!2sbd!4v1745775401979!5m2!1sbn!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
