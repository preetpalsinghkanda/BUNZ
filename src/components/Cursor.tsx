import React, { useEffect, useRef } from "react";
import cheese from "../assets/cursor/cheese-logo.webp";
import lettuce from "../assets/cursor/lettuce.webp";
import meat from "../assets/cursor/meat.webp";
import tomato from "../assets/cursor/tomato.webp";
import gsap from "gsap";

const Cursor = () => {
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);

  const images: string[] = [lettuce, tomato, cheese, meat];

  useEffect(() => {
    const cursors = imagesRef.current;

    const updateLines = () => {
      for (let i = 0; i < cursors.length - 1; i++) {
        const current = cursors[i];
        const next = cursors[i + 1];
        const line = linesRef.current[i];

        if (!current || !next || !line) continue;

        const x1 = Number(gsap.getProperty(current, "x"));
        const x2 = Number(gsap.getProperty(next, "x"));

        const y1 = Number(gsap.getProperty(current, "y"));

        const y2 = Number(gsap.getProperty(next, "y"));

        const sx = x2 - x1;
        const sy = y2 - y1;


        const distance = Math.sqrt(sx * sx + sy*sy)
        const angle = Math.atan2(sy ,sx) * (180 /Math.PI)


        gsap.set(line,{
          width : distance ,
          x : x1,
          y : y1 ,
          rotation : angle,
          transformOrigin : "left center"
        })



      }
    };

    const cursorMove = (x: MouseEvent) => {
      cursors.forEach((cursor, index) => {
        gsap.to(cursor, {
          x: x.clientX,
          y: x.clientY,
          duration: index * 0.4,
          ease: "sine.out",
          // onUpdate: updateLines,
        });
      });
    };

    window.addEventListener("mousemove", cursorMove);
  }, []);

  return (
    <div className="fixed z-100">

      {images.slice(0, -1).map((_, i) => (
        <div 
        className="absolute border h-[4px] bg-black"
          key={i}
          ref={(e) => {
           if(e) linesRef.current[i] = e;
          }}
        ></div>
      ))}

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
