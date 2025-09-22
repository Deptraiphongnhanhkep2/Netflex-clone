import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/Images/logo.png";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import ProfileImg from "../assets/Images/profile.png";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const navRef = useRef(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileProfile, setMobileProfile] = useState(false);
  const [desktopProfile, setDesktopProfile] = useState(false);

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

  // Close desktop dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!navRef.current.contains(e.target)) {
        setDesktopProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 z-20 w-full flex items-center justify-between
                 px-3 sm:px-5 py-2 sm:py-3
                 bg-gradient-to-b from-black/60 via-black/30 to-transparent
                 transition-all duration-300"
    >
      {/* Logo & Navigation Links */}
      <nav className="flex items-center gap-6 sm:gap-10">
        <img
          src={Logo}
          alt="Netflix Logo"
          className="w-16 sm:w-20 cursor-pointer"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-5 text-gray-200 text-sm lg:text-base">
          <li className="cursor-pointer hover:text-white">Home</li>
          <li className="cursor-pointer hover:text-white">TV Shows</li>
          <li className="cursor-pointer hover:text-white">Movies</li>
          <li className="cursor-pointer hover:text-white">New & Popular</li>
          <li className="cursor-pointer hover:text-white">My List</li>
          <li className="cursor-pointer hover:text-white">Browse by Language</li>
        </ul>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 sm:gap-5 text-gray-200">
        <FaSearch className="h-5 w-5 cursor-pointer hover:text-white hidden sm:block" />
        <p className="cursor-pointer hover:text-white hidden lg:block">Children</p>
        <CiBellOn className="text-2xl cursor-pointer hover:text-white hidden sm:block" />

        {/* Profile Dropdown - Desktop/Tablet */}
        <div className="relative hidden sm:block">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setDesktopProfile((prev) => !prev)}
          >
            <img src={ProfileImg} alt="Profile" className="w-8 sm:w-10 rounded-sm" />
            <IoMdArrowDropdown className="text-xl sm:text-2xl" />
          </div>

          {desktopProfile && (
            <div className="absolute right-0 top-12 w-28 flex-col gap-3 rounded-md bg-white/90 p-4 text-sm text-black shadow-lg flex">
              <p className="cursor-pointer hover:underline">Sign Out</p>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-xl text-white"
          onClick={() => {
            setMobileMenu(!mobileMenu);
            setMobileProfile(false);
          }}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-black/95 text-white flex flex-col gap-4 px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4 text-lg">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-300">Movies</li>
            <li className="cursor-pointer hover:text-gray-300">New & Popular</li>
            <li className="cursor-pointer hover:text-gray-300">My List</li>
            <li className="cursor-pointer hover:text-gray-300">Browse by Language</li>
          </ul>

          {/* Profile Section (Mobile) */}
          <div className="flex items-center gap-3 border-t border-gray-600 pt-4">
            <img src={ProfileImg} alt="Profile" className="w-10 rounded-sm" />
            <button
              onClick={() => setMobileProfile((prev) => !prev)}
              className="flex items-center gap-1"
            >
              Profile <IoMdArrowDropdown />
            </button>
          </div>

          {mobileProfile && (
            <div className="ml-12 mt-2 flex flex-col gap-2 text-gray-200 text-sm">
              <p className="cursor-pointer hover:underline">Sign Out</p>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
