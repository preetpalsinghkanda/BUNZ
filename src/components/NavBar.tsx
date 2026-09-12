import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

const NavBar = () => {
  const handleHoverIn = () => {
    const t1 = gsap.timeline();

    t1.to(".burger_text", {
      y: -20,
      duration: 0.1,
      opacity: 0,
    });

    t1.set(".burger_text", {
      y: 70,
    });

    t1.to(".burger_text", {
      y: 0,
      duration: 0.2,
      opacity: 1,
    });

    gsap.to(".burger_btn", {
      backgroundColor: "black",
      duration: 0.5,
    });
  };

  const handleHoverOut = () => {
    const t2 = gsap.timeline();
    t2.to(".burger_text", {
      duration: 0.2,
      opacity: 0,
      y: 70,
    });

    t2.to(".burger_text", {
      y: -70,
    });

    t2.to(".burger_text", {
      y: 0,
      duration: 0.1,
      opacity: 1,
    });

    gsap.to(".burger_btn", {
      backgroundColor: "#F91814",
      duration: 0.5,
    });
  };

  return (
    <div className="fixed px-12 pt-3  border items-center  bg-[#F5E3CD] uppercase flex left-0 w-full justify-between">
      <div className="text-7xl cursor-pointer hover:scale-106 duration-320 text-[#F91814] transition-transform [-webkit-text-stroke:2.5px_white] font-modak">
        BUNZ
      </div>
      <div className="flex gap-4 font-mouse items-center">
        <span
        
          onMouseLeave={handleHoverOut}
          onMouseEnter={handleHoverIn}
          className="burger_btn flex items-center hover:scale-105 justify-center text-[24px] px-5 py-1 font-light text-[#F5E3CD]  bg-[#F91814] rounded-full "
        >
          <a className="burger_text" href="">
            burgers
          </a>
        </span>
        <div className=" flex items-center justify-center gap-1  border-2 border-black/20 rounded-full px-5 py-1">
          <span className="text-[24px]">menu</span>
          <FontAwesomeIcon className="text-[20px]" icon={faBarsStaggered} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
