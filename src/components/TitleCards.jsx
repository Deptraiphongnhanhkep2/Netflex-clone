import React, { useEffect, useRef } from "react";
import Cards from "../assets/cards/Cards_data";

function TitleCards() {
  const cardsRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    // Cuộn ngang khi lăn chuột (mượt + nhanh hơn)
    const handleWheel = (e) => {
      e.preventDefault();
      el.scrollBy({
        left: e.deltaY * 3, // 👈 tăng tốc cuộn
        behavior: "smooth", // 👈 cuộn mượt
      });
    };

    // ---- Desktop drag ----
    const handleMouseDown = (e) => {
      isDown.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      moved.current = false;
    };

    const handleMouseLeave = () => {
      isDown.current = false;
    };

    const handleMouseUp = () => {
      isDown.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;

      if (Math.abs(walk) > 5) {
        moved.current = true; // có kéo
      }

      el.scrollLeft = scrollLeft.current - walk;
    };

    // ---- Mobile touch ----
    const handleTouchStart = (e) => {
      isDown.current = true;
      startX.current = e.touches[0].pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      moved.current = false;
    };

    const handleTouchEnd = () => {
      isDown.current = false;
    };

    const handleTouchMove = (e) => {
      if (!isDown.current) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;

      if (Math.abs(walk) > 5) {
        moved.current = true;
      }

      el.scrollLeft = scrollLeft.current - walk;
    };

    // Gắn sự kiện
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("touchmove", handleTouchMove);

    // Cleanup
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);

      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleCardClick = (name) => {
    if (moved.current) return; // Nếu vừa drag thì bỏ qua click
    alert(`Clicked ${name}`);
  };

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        Popular on Netflex
      </h2>
      <div
        ref={cardsRef}
        className="flex overflow-x-scroll gap-4 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
      >
        {Cards.map(({ image, name }, index) => (
          <div key={index} className="flex gap-2.5 relative">
            <img
              src={image}
              alt={name}
              className="w-60 rounded-sm cursor-pointer shrink-0"
              onClick={() => handleCardClick(name)}
            />
            <p className="absolute bottom-2.5 right-2.5 text-white">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TitleCards;
