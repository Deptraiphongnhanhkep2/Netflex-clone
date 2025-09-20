import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backArrow from "../assets/Images/back_arrow_icon.png";

export default function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTFiY2VkZjE2MmYzYzc4MTg5M2Y1Njk2MjY4MTZiZiIsIm5iZiI6MTc1ODI3NDc1MS4yMDMsInN1YiI6IjY4Y2QyNGJmMjllM2MwMzMzMjM4MmRlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RNREPSRtVmW8rQ6YvzYBbx0SWYDecanarHaZnMPspY4",
    },
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await res.json();
        const trailer =
          data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          data.results[0];
        setVideo(trailer || null);
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };
    fetchVideo();
  }, [id]);

  if (!video) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading trailer...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white bg-black">
      <img
        src={backArrow}
        alt="back"
        className="absolute top-5 left-5 w-12 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        width="90%"
        height="80%"
        frameBorder="0"
        allowFullScreen
        title={video.name}
        className="rounded-xl mb-4"
      ></iframe>

      {/* Dòng thông tin phía dưới */}
      <div className="flex items-center justify-between w-11/12 max-w-4xl text-sm sm:text-base">
        <p>{video.published_at ? video.published_at.slice(0, 10) : "N/A"}</p>
        <p className="font-semibold text-center">{video.name || "N/A"}</p>
        <p>{video.type || "N/A"}</p>
      </div>
    </div>
  );
}
