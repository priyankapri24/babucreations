import React from 'react';
import { FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Footer from '../common/Footer';

function ContactUs() {
  return (
    
    <div className="min-h bg-gradient-to-b from-purple-100  p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[#730280] mb-8 text-center">Get in Touch</h1>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl space-y-6">
        <p className="text-lg text-gray-700 text-center">
          Have questions, custom requests, or want to collaborate? Reach out to us anytime!
        </p>

        <div className="space-y-4 text-base">
          <div className="flex items-center gap-4">
            <FaInstagram className="text-pink-600 text-xl" />
            <a
              href="https://instagram.com/printmystory_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:underline"
            >
              @babustores
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaYoutube className="text-red-600 text-xl" />
            <a
              href="https://www.youtube.com/@senjitaapochi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:underline"
            >
              senjitaapochi YouTube
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-blue-600 text-xl" />
            <a
              href="mailto:babustores@gmail.com"
              className="text-gray-800 hover:underline"
            >
              babustores@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-green-600 text-xl" />
            <span className="text-gray-800">+91 9840357974</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
