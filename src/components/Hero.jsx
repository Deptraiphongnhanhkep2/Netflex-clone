import React from "react";
import HeroBanner from "../assets/Images/Hero.jpg";
import HeroTitle from "../assets/Images/hero_title.png";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Hero = () => {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src={HeroBanner}
        alt="Film"
        className="h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 flex flex-col text-white px-10 pb-10 max-w-2xl">
        <img
          src={HeroTitle}
          alt="caption"
          className="mb-6 w-[400px] max-w-full"
        />

        <p className="mb-6 text-sm leading-relaxed text-gray-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
          cumque quam nihil rerum aspernatur maxime ipsa? Atque amet, commodi
          assumenda porro animi dolorem suscipit delectus eius, cumque rerum
          numquam libero.
        </p>

        <div className="flex gap-4">
          <button className="mb-4 flex items-center gap-2 rounded-md bg-white px-6 py-2 text-lg font-semibold text-black transition-colors hover:bg-gray-300">
            <FaPlay />
            Play
          </button>

          <button className="mb-4 flex items-center gap-2 rounded-md bg-gray-600/70 px-6 py-2 text-lg font-semibold text-white transition-colors hover:bg-white/75 hover:text-black">
            <IoIosInformationCircleOutline />
            More info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
