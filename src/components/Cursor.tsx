import React, { useEffect, useRef } from "react";
import cheese from "../assets/cursor/cheese-logo.webp";
import lettuce from "../assets/cursor/lettuce.webp";
import meat from "../assets/cursor/meat.webp";
import tomato from "../assets/cursor/tomato.webp";
import gsap from "gsap";

const Cursor = () => {
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const images: string[] = [lettuce, tomato, cheese, meat];

  useEffect(() => {
    const cursors = imagesRef.current;

    const cursorMove = (x: any) => {
      cursors.forEach((cursor, index) => {
        gsap.to(cursor, {
          x: x.clientX,
          y: x.clientY,
          duration: 0 + index * 0.4,
          ease: "sine.out",
        });
      });
    };

    window.addEventListener("mousemove", cursorMove);
  }, []);

  return (
    <div className="fixed z-100">
      {images.map((image, i) => (
        <div
          key={i}
          ref={(e) => {
            if (e) {
              imagesRef.current[i] = e;
            }
          }}
          className={`absolute ${
            i === 0 ? "z-40" : i === 1 ? "z-30" : i === 2 ? "z-20" : "z-10"
          }`}
        >
          <div className="flex bg-[#ffffffd1] items-center justify-center border-2 border-[#8e8c8c47] overflow-hidden -translate-x-4.5 -translate-y-4 h-8 w-8 rounded-full">
            <img src={image} className="h-5 w-5 object-contain " alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cursor;
