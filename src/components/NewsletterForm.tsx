"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      setSuccess(false);
      return;
    }

    const templateParams = {
      email: email,
    };

    // Replace the below service_id and template_id with your actual values from EmailJS
    emailjs
      .send(
        "service_84mkm6r", // EmailJS service ID
        "template_lena7f3", // Template ID
        templateParams,
        "NistrL4Rj1YxpHzI8" // Public Key for EmailJS
      )
      .then(() => {
        setSuccess(true);
        setMessage("Subscription successful! Check your inbox.");
      })
      .catch(() => {
        setSuccess(false);
        setMessage("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="bg-transparent py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-4">Stay Updated</h3>
        <p className="text-lg mb-6">
          Subscribe to our newsletter and receive the latest updates directly to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex border-2 border-indigo-600 rounded-md justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-72 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={email}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition duration-300"
          >
            Subscribe
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center text-lg ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}