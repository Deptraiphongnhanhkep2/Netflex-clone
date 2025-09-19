import React, { useEffect, useRef } from "react";
import Cards from "../assets/cards/Cards_data";

function TitleCards({title,category}) {
  const cardsRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false);
  const SCROLL_SPEED = 1.5;

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
      moved.current = false;
    };

    const move = (pageX) => {
      if (!isDown.current) return;
      const x = pageX - el.offsetLeft;
      const walk = (x - startX.current) * SCROLL_SPEED;
      if (Math.abs(walk) > 5) moved.current = true;
      el.scrollLeft = scrollLeft.current - walk;
    };

    const end = () => {
      isDown.current = false;
    };

    // Mouse events
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("mousedown", (e) => start(e.pageX));
    el.addEventListener("mousemove", (e) => move(e.pageX));
    el.addEventListener("mouseup", end);
    el.addEventListener("mouseleave", end);

    // Touch events
    el.addEventListener("touchstart", (e) => start(e.touches[0].pageX));
    el.addEventListener("touchmove", (e) => move(e.touches[0].pageX));
    el.addEventListener("touchend", end);

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="mt-12 mb-8 p-6">
      <h2 className="text-2xl font-bold text-white mb-4">{title?title: "Popular on Netflex"} </h2>
      <div
        ref={cardsRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide cursor-grab active:cursor-grabbing select-none scroll-smooth"
      >
        {Cards.map(({ image, name }, index) => (
          <div key={index} className="flex gap-2.5 relative">
            <img
              src={image}
              alt={name}
              className="w-60 rounded-sm cursor-pointer shrink-0 
                         transition-transform duration-300 ease-in-out 
                          hover:z-10 hover:shadow-xl"
            />
            <p className="absolute bottom-2.5 right-2.5 text-white">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
