import React from "react";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 py-10">
      {/* Social Icons */}
      <div className="flex gap-6 justify-center mb-8">
        <FaInstagram className="cursor-pointer text-2xl hover:text-white transition" />
        <FaFacebook className="cursor-pointer text-2xl hover:text-white transition" />
        <FaYoutube className="cursor-pointer text-2xl hover:text-white transition" />
      </div>

      {/* Links */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm max-w-4xl mx-auto mb-8">
        <li className="hover:underline cursor-pointer">Audio Description</li>
        <li className="hover:underline cursor-pointer">Help Centre</li>
        <li className="hover:underline cursor-pointer">Gift Cards</li>
        <li className="hover:underline cursor-pointer">Media Centre</li>
        <li className="hover:underline cursor-pointer">Investor Relations</li>
        <li className="hover:underline cursor-pointer">Jobs</li>
        <li className="hover:underline cursor-pointer">Terms of Use</li>
        <li className="hover:underline cursor-pointer">Privacy</li>
        <li className="hover:underline cursor-pointer">Legal Notices</li>
        <li className="hover:underline cursor-pointer">Cookie Preferences</li>
        <li className="hover:underline cursor-pointer">
          Corporate Information
        </li>
        <li className="hover:underline cursor-pointer">Contact Us</li>
      </ul>

      {/* CopyRight */}
      <p className="text-center text-sm text-gray-500">
        © 2025 Netflex. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
