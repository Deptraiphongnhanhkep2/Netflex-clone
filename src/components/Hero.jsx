import React from "react";
import HeroBanner from "../assets/Images/Hero.jpg";
import HeroTitle from "../assets/Images/hero_title.png";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";

function Hero() {
  return (
    <div className="h-[100vh] w-full">
      <div>
        <img
          className=" relative hero-image w-full"
          src={HeroBanner}
          alt="Film"
        />
      </div>
      <div className="absolute bottom-0 text-white flex flex-col">
        <img className="w-2xl pl-9 mb-[30px]" src={HeroTitle} alt="caption" />
        <p className="max-w-xl text-sm mb-4 ml-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
          cumque quam nihil rerum aspernatur maxime ipsa? Atque amet, commodi
          assumenda porro animi dolorem suscipit delectus eius, cumque rerum
          numquam libero
        </p>
        <div className="ml-10 mb-10 flex gap-4">
          <button className="bg-white text-black flex items-center gap-2 py-2 px-6 rounded-md text-lg font-semibold cursor-pointer hover:bg-gray-300 transition mb-6">
            <FaPlay />
            Play
          </button>
          <button
            className="bg-gray-600/70 text-white flex items-center gap-2 py-2 px-6 rounded-md text-lg font-semibold cursor-pointer hover:bg-white/75 transition mb-6"
          >
            <IoIosInformationCircleOutline />
            More info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
