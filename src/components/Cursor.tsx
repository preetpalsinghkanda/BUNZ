import { useEffect, useRef, useState } from "react";
import cheese from "../assets/cursor/cheese-logo.webp";
import lettuce from "../assets/cursor/lettuce.webp";
import meat from "../assets/cursor/meat.webp";
import tomato from "../assets/cursor/tomato.webp";
import gsap from "gsap";

const foodItems = [
  {
    src: lettuce,
  },
  {
    src: tomato,
  },
  {
    src: cheese,
  },
  {
    src: meat,
  },
];

type Point = {
  x: number;
  y: number;
};

const Cursor = ({
  ropeColor = "#ffffff",
  ropeWidth = 3,
  ropeOpacity = 1,
  segmentLength = 12,
  segmentCount = 8,
  knots = [0, 2, 4, 7],
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const foodRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const initializedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const segmentLengthRef = useRef({
    value: segmentLength,
  });

  const hideTimeoutRef = useRef<number | null>(null);


  //check support

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setIsSupported(finePointer && !reducedMotion);
  }, []);



  //anim

  useEffect(() => {
    if (!isSupported) return;

    const createPath = (points: Point[]) => {
      if (!pathRef.current || points.length === 0) return;

      let path = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];

        const middleX = (current.x + next.x) / 2;
        const middleY = (current.y + next.y) / 2;

        path += ` Q ${current.x} ${current.y} ${middleX} ${middleY}`;     
      }

      const lastPoint = points[points.length - 1];

      path += ` L ${lastPoint.x} ${lastPoint.y}`;

      pathRef.current.setAttribute("d", path);
    };

    const updateFoodItems = (points: Point[]) => {
      knots.slice(0, 4).forEach((knotIndex, foodIndex) => {
        const foodElement = foodRefs.current[foodIndex];

        if (!foodElement) return;

        const safeIndex = Math.max(0, Math.min(segmentCount - 1, knotIndex));

        const currentPoint = points[safeIndex];

        if (!currentPoint) return;

        const previousIndex = Math.max(0, safeIndex - 1);
        const previousPoint = points[previousIndex];

        if (!previousPoint) return;

        const angle =
          Math.atan2(
            currentPoint.y - previousPoint.y,
            currentPoint.x - previousPoint.x,
          ) *
          (180 / Math.PI);

        gsap.set(foodElement, {
          x: currentPoint.x,
          y: currentPoint.y,
          rotation: angle,
          zIndex: foodIndex === 0 ? 100 : 1,
        });
      });
    };

    const animate = () => {
      const points = pointsRef.current;

      if (initializedRef.current && points.length === segmentCount) {
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;

        gsap.to(points[0], {
          x: mouseX,
          y: mouseY,
          duration: 0.05,
          ease: "power2.out",
          overwrite: true,
        });

        const currentLength = Math.max(1, segmentLengthRef.current.value);

        for (let i = 1; i < segmentCount; i++) {
          const previousPoint = points[i - 1];
          const currentPoint = points[i];

          const differenceX = previousPoint.x - currentPoint.x;
          const differenceY = previousPoint.y - currentPoint.y;

          const distance = Math.sqrt(
            differenceX * differenceX + differenceY * differenceY,
          );

          if (distance > currentLength) {
            const angle = Math.atan2(differenceY, differenceX);

            const targetX = previousPoint.x - Math.cos(angle) * currentLength;

            const targetY = previousPoint.y - Math.sin(angle) * currentLength;

            gsap.to(currentPoint, {
              x: targetX,
              y: targetY,
              duration: 0.12 + i * 0.01,
              ease: "power3.out",
              overwrite: true,
            });
          }
        }

        createPath(points);
        updateFoodItems(points);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      mouseRef.current.x = mouseX;
      mouseRef.current.y = mouseY;

      if (!initializedRef.current) {
        pointsRef.current = Array.from({ length: segmentCount }, () => ({
          x: mouseX,
          y: mouseY,
        }));

        initializedRef.current = true;
      }

      setCursorVisible(true);

      gsap.to(segmentLengthRef.current, {
        value: segmentLength,
        duration: 0.1,
        overwrite: true,
      });

      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      hideTimeoutRef.current = window.setTimeout(() => {
        gsap.to(segmentLengthRef.current, {
          value: 1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
        });
      }, 100);

      const hoveredElement = document.elementFromPoint(mouseX, mouseY);

      let currentElement: Element | null = hoveredElement;
      let shouldHide = false;

      while (currentElement) {
        if (currentElement.hasAttribute("data-cursor-hide")) {
          shouldHide = true;
          break;
        }

        currentElement = currentElement.parentElement;
      }

      if (shouldHide) {
        setCursorVisible(false);
      } else {
        setCursorVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      gsap.killTweensOf(pointsRef.current);
      gsap.killTweensOf(segmentLengthRef.current);
    };
  }, [isSupported, segmentCount, segmentLength, knots]);

  if (!isSupported) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 pointer-events-none z-[99] max-md:hidden"
      style={{
        opacity: cursorVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <svg className="absolute inset-0 h-full w-full">
        <path
          ref={pathRef}
          fill="none"
          stroke={ropeColor}
          strokeWidth={ropeWidth}
          strokeOpacity={ropeOpacity}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {knots.slice(0, 4).map((_, i) => {
        const food = foodItems[i];

        return (
          <div
            key={i}
            ref={(element) => {
              foodRefs.current[i] = element;
            }}
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="grid place-items-center h-12 w-12 rounded-full border border-black/20 bg-white/90 backdrop-blur-md">
              <img
                src={food.src}
                draggable={false}
                className="h-[70%] w-[70%] select-none object-contain"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cursor;
