import React, { useEffect, useRef, useState } from "react";

function TitleCards({ title, category }) {
  const cardsRef = useRef(null);
  const [apiData, setApiData] = useState([]);

  const SCROLL_SPEED = 1.5;
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTFiY2VkZjE2MmYzYzc4MTg5M2Y1Njk2MjY4MTZiZiIsIm5iZiI6MTc1ODI3NDc1MS4yMDMsInN1YiI6IjY4Y2QyNGJmMjllM2MwMzMzMjM4MmRlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RNREPSRtVmW8rQ6YvzYBbx0SWYDecanarHaZnMPspY4",
    },
  };

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category ?? "now_playing"
          }?language=en-US&page=1`,
          options
        );
        const data = await res.json();
        setApiData(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, [category]);

  // Scroll/drag logic
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 3, behavior: "smooth" });
    };

    const start = (pageX) => {
      isDown.current = true;
      startX.current = pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };

    const move = (pageX) => {
      if (!isDown.current) return;
      const x = pageX - el.offsetLeft;
      const walk = (x - startX.current) * SCROLL_SPEED;
      el.scrollLeft = scrollLeft.current - walk;
    };

    const end = () => {
      isDown.current = false;
    };

    // Event bindings
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("mousedown", (e) => start(e.pageX));
    el.addEventListener("mousemove", (e) => move(e.pageX));
    el.addEventListener("mouseup", end);
    el.addEventListener("mouseleave", end);
    el.addEventListener("touchstart", (e) => start(e.touches[0].pageX));
    el.addEventListener("touchmove", (e) => move(e.touches[0].pageX));
    el.addEventListener("touchend", end);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mousedown", (e) => start(e.pageX));
      el.removeEventListener("mousemove", (e) => move(e.pageX));
      el.removeEventListener("mouseup", end);
      el.removeEventListener("mouseleave", end);
      el.removeEventListener("touchstart", (e) => start(e.touches[0].pageX));
      el.removeEventListener("touchmove", (e) => move(e.touches[0].pageX));
      el.removeEventListener("touchend", end);
    };
  }, []);

  return (
    <div className="mt-12 mb-8 p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        {title || "Popular on Netflix"}
      </h2>

      <div
        ref={cardsRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide cursor-grab active:cursor-grabbing select-none scroll-smooth"
      >
        {apiData.map((movie) => (
          <div key={movie.id} className="flex gap-2.5 relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.original_title}
              className="w-60 rounded-sm cursor-pointer shrink-0 
                         transition-transform duration-300 ease-in-out 
                         hover:z-10 hover:shadow-xl"
            />
            <p className="absolute bottom-2.5 right-2.5 text-white">
              {movie.original_title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
