import React, { useEffect, useRef } from "react";
import Logo from "../assets/Images/logo.png";
import { FaSearch } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import ProfileImg from "../assets/Images/profile.png";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const navRef = useRef(null);

  // Add or remove background & shadow based on scroll position
  useEffect(() => {
    const el = navRef.current;

    const handleScroll = () => {
      if (window.scrollY >= 80) {
        el.classList.add("bg-black/90", "shadow-md");
      } else {
        el.classList.remove("bg-black/90", "shadow-md");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className="
        fixed top-0 left-0 z-20 w-full
        flex items-center justify-between
        p-3 text-sm
        bg-gradient-to-b from-black/60 via-black/30 to-transparent
        transition-all duration-300
      "
    >
      {/* Logo & Navigation Links */}
      <nav className="flex items-center gap-12 px-5">
        <img src={Logo} alt="Netflix Logo" className="w-20 cursor-pointer" />

        <ul className="flex gap-5 text-gray-200">
          <li className="cursor-pointer hover:text-white">Home</li>
          <li className="cursor-pointer hover:text-white">TV Shows</li>
          <li className="cursor-pointer hover:text-white">Movies</li>
          <li className="cursor-pointer hover:text-white">New & Popular</li>
          <li className="cursor-pointer hover:text-white">My List</li>
          <li className="cursor-pointer hover:text-white">
            Browse by Language
          </li>
        </ul>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-5 pr-5 text-gray-200">
        {/* Search */}
        <FaSearch className="h-5 w-5 cursor-pointer hover:text-white" />

        {/* Kids Section */}
        <p className="cursor-pointer hover:text-white">Children</p>

        {/* Notification Bell */}
        <CiBellOn className="text-2xl cursor-pointer hover:text-white" />

        {/* Profile Dropdown */}
        <div className="relative group">
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={ProfileImg} alt="Profile" className="w-10 rounded-sm" />
            <IoMdArrowDropdown className="text-2xl" />
          </div>

          <div className="absolute right-0 top-12 hidden w-28 flex-col gap-3 rounded-md bg-white/90 p-4 text-sm text-black shadow-lg group-hover:flex">
            <p className="cursor-pointer hover:underline">Sign Out</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
