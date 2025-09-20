import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackArrow from "../assets/Images/back_arrow_icon.png";

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  // Request options for TMDB API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTFiY2VkZjE2MmYzYzc4MTg5M2Y1Njk2MjY4MTZiZiIsIm5iZiI6MTc1ODI3NDc1MS4yMDMsInN1YiI6IjY4Y2QyNGJmMjllM2MwMzMzMjM4MmRlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RNREPSRtVmW8rQ6YvzYBbx0SWYDecanarHaZnMPspY4",
    },
  };

  // Fetch trailer data when component mounts or `id` changes
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await res.json();
        if (!Array.isArray(data.results)) return;

        // Filter YouTube trailers
        const trailers = data.results
          .filter((v) => v.type === "Trailer" && v.site === "YouTube")
          .sort(
            (a, b) => new Date(b.published_at) - new Date(a.published_at)
          );

        // Prefer "Official Trailer", exclude "Sign Language"/"Subtitled"
        const preferred = trailers.find((v) => {
          const name = v.name.toLowerCase();
          return (
            name.includes("official trailer") &&
            !name.includes("sign language") &&
            !name.includes("subtitled")
          );
        });

        setVideo(preferred || trailers[0] || null);
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };

    fetchVideo();
  }, [id]);

  // Show loading while waiting for video data
  if (!video) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading trailer...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-4 relative">
      {/* Back button using custom image */}
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer absolute top-4 left-4 flex items-center gap-2 text-white bg-black/40 px-3 py-2 rounded-md hover:bg-black/60 transition"
      >
        <img
          src={BackArrow}
          alt="Back"
          className="w-5 h-5 object-contain"
        />
        Back
      </button>

      {/* YouTube player */}
      <div className="w-full max-w-5xl aspect-video mb-4 mt-12">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.key}`}
          title={video.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl"
        />
      </div>

      {/* Video metadata */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row sm:items-center sm:justify-between text-white text-sm px-2">
        <span>
          {video.published_at
            ? new Date(video.published_at).toISOString().split("T")[0]
            : "N/A"}
        </span>
        <span className="font-medium text-center">
          {video.name || "N/A"}
        </span>
        <span>{video.type || "N/A"}</span>
      </div>
    </div>
  );
}

export default Player;
