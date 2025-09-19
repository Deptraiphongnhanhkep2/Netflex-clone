import React from "react";
import Logo from "../assets/Images/logo.png";
import { FaSearch } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import ProfileImg from "../assets/Images/profile.png";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 w-full z-20 flex justify-between text-sm items-center p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
      <div className="flex items-center gap-12 p-5">
        <img src={Logo} alt="Neflex" className="w-20 cursor-pointer" />
        <ul className="flex gap-5">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browser By Languague</li>
        </ul>
      </div>
      <div className="flex gap-5 items-center">
        <FaSearch className="w-5 cursor-pointer" />
        <p>Children</p>
        <CiBellOn className="text-2xl cursor-pointer" />
        <div className="relative group">
          <div className="flex items-center gap-1 cursor-pointer">
            <img className="w-12 rounded-sm " src={ProfileImg} alt="profile" />
            <IoMdArrowDropdown className="w-10 cursor-pointer text-2xl z-10" />
          </div>

          <div className="absolute right-0 top-12 hidden group-hover:flex flex-col gap-3 w-28 bg-white/90 text-black p-4 rounded-md text-sm shadow-lg">
            <p className="cursor-pointer text-md hover:underline">Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
