import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TitleCards from "../components/TitleCards";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <TitleCards />
      <TitleCards title={"Block Buster Movie"} />
      <TitleCards title={"Only on Netflex"} />
      <TitleCards title={"Upcoming"} />
      <TitleCards title={"Top picks for you"} />
      <Footer />
    </div>
  );
}

export default Home;
