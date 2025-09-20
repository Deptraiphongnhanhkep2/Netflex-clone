import React from "react";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 py-10">
      {/* Social Icons */}
      <div className="mb-8 flex justify-center gap-6">
        <FaInstagram className="text-2xl cursor-pointer hover:text-white transition-colors duration-200" />
        <FaFacebook className="text-2xl cursor-pointer hover:text-white transition-colors duration-200" />
        <FaYoutube className="text-2xl cursor-pointer hover:text-white transition-colors duration-200" />
      </div>

      {/* Links */}
      <ul className="mx-auto mb-8 grid max-w-4xl grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:grid-cols-4">
        <li className="cursor-pointer hover:underline">Audio Description</li>
        <li className="cursor-pointer hover:underline">Help Centre</li>
        <li className="cursor-pointer hover:underline">Gift Cards</li>
        <li className="cursor-pointer hover:underline">Media Centre</li>
        <li className="cursor-pointer hover:underline">Investor Relations</li>
        <li className="cursor-pointer hover:underline">Jobs</li>
        <li className="cursor-pointer hover:underline">Terms of Use</li>
        <li className="cursor-pointer hover:underline">Privacy</li>
        <li className="cursor-pointer hover:underline">Legal Notices</li>
        <li className="cursor-pointer hover:underline">Cookie Preferences</li>
        <li className="cursor-pointer hover:underline">Corporate Information</li>
        <li className="cursor-pointer hover:underline">Contact Us</li>
      </ul>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500">
        © 2025 Netflix. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
