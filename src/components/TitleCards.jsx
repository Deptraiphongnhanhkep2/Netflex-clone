import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function TitleCards({ title, category }) {
  const cardsRef = useRef(null);
  const [apiData, setApiData] = useState([]);

  // Scroll configuration
  const SCROLL_SPEED = 1.5;
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // Request options for TMDB API
  const fetchOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTFiY2VkZjE2MmYzYzc4MTg5M2Y1Njk2MjY4MTZiZiIsIm5iZiI6MTc1ODI3NDc1MS4yMDMsInN1YiI6IjY4Y2QyNGJmMjllM2MwMzMzMjM4MmRlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RNREPSRtVmW8rQ6YvzYBbx0SWYDecanarHaZnMPspY4",
    },
  };

  // Fetch movies from TMDB API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category ?? "now_playing"
          }?language=en-US&page=1`,
          fetchOptions
        );
        const data = await res.json();
        setApiData(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [category]);

  // Handle scrolling and dragging events
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 3, behavior: "smooth" });
    };

    const startDrag = (pageX) => {
      isDragging.current = true;
      startX.current = pageX - el.offsetLeft;
      scrollStart.current = el.scrollLeft;
    };

    const onMouseDown = (e) => startDrag(e.pageX);
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollStart.current - (x - startX.current) * SCROLL_SPEED;
    };
    const stopDrag = () => (isDragging.current = false);

    const onTouchStart = (e) => startDrag(e.touches[0].pageX);
    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      el.scrollLeft = scrollStart.current - (x - startX.current) * SCROLL_SPEED;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", stopDrag);
    el.addEventListener("mouseleave", stopDrag);
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", stopDrag);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", stopDrag);
      el.removeEventListener("mouseleave", stopDrag);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", stopDrag);
    };
  }, []);

  return (
    <div className="mt-6 sm:mt-10 md:mt-12 mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4 md:px-6">
      {/* Section title */}
      <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-bold text-white">
        {title || "Popular on Netflix"}
      </h2>

      {/* Horizontal card list */}
      <div
        ref={cardsRef}
        className="flex overflow-x-auto gap-3 sm:gap-4 md:gap-5 scrollbar-hide 
                   cursor-grab active:cursor-grabbing select-none scroll-smooth"
      >
        {apiData.map((movie) => (
          <Link
            key={movie.id}
            to={`/player/${movie.id}`}
            className="relative group shrink-0 rounded-md overflow-hidden shadow-md
                       w-32 h-20 xs:w-36 xs:h-24 sm:w-44 sm:h-28 md:w-60 md:h-36"
          >
            {movie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.original_title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Movie title */}
            <p className="absolute bottom-1 left-1 xs:bottom-2 xs:left-2 
                          text-[10px] xs:text-xs sm:text-sm md:text-base 
                          font-medium text-white drop-shadow-md line-clamp-2">
              {movie.original_title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
