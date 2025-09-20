import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import YouTube from "react-youtube";

const API_KEY = "891bcedf162f3c781893f569626816bf"; // TMDB API Key

// Hero Banner with trailer modal
const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch random movie when component mounts
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const random =
            data.results[Math.floor(Math.random() * data.results.length)];
          setMovie(random);
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, []);

  // Play trailer
  const handlePlay = async () => {
    if (!movie) return;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const trailer = data.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      {movie && movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Overlays */}
      {/* Vertical gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      {/* Dark corners */}
      <div className="pointer-events-none absolute left-0 top-0 h-1/3 w-1/3 bg-gradient-to-br from-black/80 via-transparent to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-1/3 w-1/3 bg-gradient-to-bl from-black/80 via-transparent to-transparent" />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 max-w-2xl px-10 pb-10 text-white">
        <h1 className="mb-6 text-3xl font-bold">{movie?.title}</h1>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-200">
          {movie?.overview}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handlePlay}
            className="mb-4 flex cursor-pointer items-center gap-2 rounded-md bg-white px-6 py-2 text-lg font-semibold text-black hover:bg-gray-300"
          >
            <FaPlay />
            Watch Now
          </button>

          <button className="mb-4 flex cursor-pointer items-center gap-2 rounded-md bg-gray-600/70 px-6 py-2 text-lg font-semibold text-white hover:bg-white/80 hover:text-black">
            <IoIosInformationCircleOutline />
            More Info
          </button>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80">
          <div className="relative w-[90%] max-w-4xl">
            {/* Close button */}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -right-4 -top-4 z-40 cursor-pointer rounded-full bg-white px-3 py-1 text-xl font-bold text-black shadow hover:bg-gray-200"
            >
              ✕
            </button>

            <YouTube
              videoId={trailerKey}
              opts={{
                width: "100%",
                height: "480",
                playerVars: { autoplay: 1 },
              }}
              className="overflow-hidden rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
