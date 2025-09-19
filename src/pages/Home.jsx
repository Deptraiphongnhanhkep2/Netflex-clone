import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TitleCards from "../components/TitleCards";
import Footer from "../components/Footer";

const sections = [
  { title: "Block Buster Movie", category: "top_rated" },
  { title: "Only on Netflex", category: "popular" },
  { title: "Upcoming", category: "upcoming" },
  { title: "Top picks for you", category: "now_playing" },
];

function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <TitleCards /> {/* Section mặc định */}
        {sections.map(({ title, category }) => (
          <TitleCards key={category} title={title} category={category} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
