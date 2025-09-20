import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

  // Scroll / drag logic
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

    const handleMouseDown = (e) => start(e.pageX);
    const handleMouseMove = (e) => {
      if (!isDown.current) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * SCROLL_SPEED;
      el.scrollLeft = scrollLeft.current - walk;
    };
    const handleMouseUp = () => (isDown.current = false);

    const handleTouchStart = (e) => start(e.touches[0].pageX);
    const handleTouchMove = (e) => {
      if (!isDown.current) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - startX.current) * SCROLL_SPEED;
      el.scrollLeft = scrollLeft.current - walk;
    };
    const handleTouchEnd = () => (isDown.current = false);

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mouseleave", handleMouseUp);
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mouseleave", handleMouseUp);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
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
          <Link
            key={movie.id}
            to={`/player/${movie.id}`}
            className="relative group w-60 h-36 shrink-0 rounded-md overflow-hidden shadow-md"
          >
            {movie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.original_title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <p className="absolute bottom-2 left-2 text-sm font-medium text-white drop-shadow-md line-clamp-2">
              {movie.original_title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
