import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import YouTube from "react-youtube";

const API_KEY = "891bcedf162f3c781893f569626816bf"; // TMDB API Key

// Hero Banner with background trailer
const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch random movie
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        if (data.results?.length > 0) {
          const random =
            data.results[Math.floor(Math.random() * data.results.length)];
          setMovie(random);

          // Fetch trailer key
          const trailerRes = await fetch(
            `https://api.themoviedb.org/3/movie/${random.id}/videos?api_key=${API_KEY}&language=en-US`
          );
          const trailerData = await trailerRes.json();
          const trailer = trailerData.results?.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          );
          if (trailer) setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, []);

  return (
    <section className="relative min-h-[70vh] sm:min-h-screen w-full overflow-hidden bg-black">
      {/* Background Video (desktop) */}
      {trailerKey && (
        <div className="absolute inset-0 hidden sm:block">
          <YouTube
            videoId={trailerKey}
            className="h-full w-full"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                mute: 1,
                loop: 1,
                playlist: trailerKey, // loop requires playlist param
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
              },
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        </div>
      )}

      {/* Background Image (mobile fallback) */}
      {movie?.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
        />
      )}

      {/* Text content */}
      <div className="absolute bottom-0 left-0 max-w-lg sm:max-w-2xl px-4 sm:px-10 pb-6 sm:pb-10 text-white">
        <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-5xl font-bold leading-snug drop-shadow-lg">
          {movie?.title}
        </h1>
        <p className="mb-4 sm:mb-6 line-clamp-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-200 drop-shadow-md">
          {movie?.overview}
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            onClick={() => setShowTrailer(true)}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg font-semibold text-black hover:bg-gray-300"
          >
            <FaPlay />
            Watch Now
          </button>

          <button className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-600/70 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-lg font-semibold text-white hover:bg-white/80 hover:text-black">
            <IoIosInformationCircleOutline />
            More Info
          </button>
        </div>
      </div>

      {/* Trailer Modal (on demand) */}
      {showTrailer && trailerKey && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 px-2 sm:px-6">
          <div className="relative w-full max-w-2xl sm:max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 z-40 cursor-pointer rounded-full bg-white px-2 sm:px-3 py-0.5 sm:py-1 text-lg sm:text-xl font-bold text-black shadow hover:bg-gray-200"
            >
              ✕
            </button>

            <YouTube
              videoId={trailerKey}
              opts={{
                width: "100%",
                height: "240",
                playerVars: { autoplay: 1 },
              }}
              className="overflow-hidden rounded-md sm:rounded-xl sm:h-[480px]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
