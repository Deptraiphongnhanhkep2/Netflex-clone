import React from "react";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 text-gray-400">
      {/* === Social Media Icons === */}
      <div className="mb-6 sm:mb-8 flex justify-center gap-5 sm:gap-6">
        <FaInstagram className="cursor-pointer text-xl sm:text-2xl transition-colors duration-200 hover:text-white" />
        <FaFacebook className="cursor-pointer text-xl sm:text-2xl transition-colors duration-200 hover:text-white" />
        <FaYoutube className="cursor-pointer text-xl sm:text-2xl transition-colors duration-200 hover:text-white" />
      </div>

      {/* === Navigation Links === */}
      <ul className="mx-auto mb-6 sm:mb-8 grid max-w-4xl grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm md:text-base sm:grid-cols-3 md:grid-cols-4">
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

      {/* === Copyright === */}
      <p className="text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} Netflix. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
