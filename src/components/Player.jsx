import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef(null);
  const [movies, setMovies] = useState([]);

  const SCROLL_SPEED = 1.5;
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const fetchOptions = {
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
          `https://api.themoviedb.org/3/movie/${category ?? "now_playing"}?language=en-US&page=1`,
          fetchOptions
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [category]);

  // Scroll & drag events
  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollBy({ left: e.deltaY * 3, behavior: "smooth" });
    };

    const startDrag = (pageX) => {
      isDragging.current = true;
      startX.current = pageX - container.offsetLeft;
      scrollStart.current = container.scrollLeft;
    };

    const moveDrag = (pageX) => {
      if (!isDragging.current) return;
      const x = pageX - container.offsetLeft;
      const walk = (x - startX.current) * SCROLL_SPEED;
      container.scrollLeft = scrollStart.current - walk;
    };

    const stopDrag = () => {
      isDragging.current = false;
    };

    const handleMouseDown = (e) => startDrag(e.pageX);
    const handleMouseMove = (e) => moveDrag(e.pageX);
    const handleTouchStart = (e) => startDrag(e.touches[0].pageX);
    const handleTouchMove = (e) => moveDrag(e.touches[0].pageX);

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", stopDrag);
    container.addEventListener("mouseleave", stopDrag);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", stopDrag);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", stopDrag);
      container.removeEventListener("mouseleave", stopDrag);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", stopDrag);
    };
  }, []);

  return (
    <div className="mt-12 mb-8 p-6">
      <h2 className="mb-4 text-2xl font-bold text-white">
        {title || "Popular on Netflix"}
      </h2>

      <div
        ref={cardsRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none scroll-smooth"
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/player/${movie.id}`}
              className="relative h-36 w-60 shrink-0 overflow-hidden rounded-md shadow-md group"
            >
              {movie.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.original_title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <p className="absolute bottom-2 left-2 text-sm font-medium text-white drop-shadow-md line-clamp-2">
                {movie.original_title}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-400">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
