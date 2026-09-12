import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

const NavBar = () => {
  const burgerHandleHoverIn = () => {
    const t1 = gsap.timeline();

    t1.to(".burger_text_one", {
      y: -12,
      duration: 0.1,
      opacity: 0,
    });

    t1.to(".burger_text_two", {
      top: 4,
      opacity: 1,
      duration: 0.1,
    });

    t1.to(
      ".burger_btn",
      {
        backgroundColor: "black",
        duration: 0,
      },
      "<",
    );
  };

  const burgerHandleHoverOut = () => {
    const t2 = gsap.timeline();

    t2.to(".burger_text_two", {
      top: 12,
      opacity: 0,
      duration: 0.1,
    });

    t2.to(".burger_text_one", {
      y: 0,
      duration: 0.1,
      opacity: 1,
    });

    t2.to(
      ".burger_btn",
      {
        backgroundColor: "#F91814",
        duration: 0,
      },
      "<",
    );
  };

  const menuHandleHoverIn = () => {
    const t1 = gsap.timeline();

    t1.to(".menu_text_one", {
      y: -12,
      opacity: 0,
      duration: 0.1,
    });

    t1.to(".menu_text_two",{
      top: 0,
      fontSize : "25px",
      duration : 0.1,
      opacity : 1,
    })
  };

  const menuHandleHoverOut =()=>{
    const t2 = gsap.timeline()

    t2.to(".menu_text_two",{
      top : 12,
      duration :  0.1 ,
      opacity  : 0,
    })

    t2.to(".menu_text_one",{
      opacity : 1,
      duration : 0.1,
      y: 0
    })

  }

  return (
    <div className="fixed px-12 pt-3  border items-center  bg-[#F5E3CD] uppercase flex left-0 w-full justify-between">
      <div className="text-7xl cursor-pointer hover:scale-106 duration-320 text-[#F91814] transition-transform [-webkit-text-stroke:2.5px_white] font-modak">
        BUNZ
      </div>
      <div className="flex gap-4 font-mouse items-center">
        <a
          onMouseLeave={burgerHandleHoverOut}
          onMouseEnter={burgerHandleHoverIn}
          className="burger_btn flex relative items-center hover:scale-107 duration-300 justify-center text-[24px] px-5 py-1 font-light text-[#F5E3CD]  bg-[#F91814] rounded-full "
        >
          <span className="burger_text_one">burgers</span>
          <span className="absolute flex items-center burger_text_two opacity-0  top-10 ">
            burgers
          </span>
        </a>
        <div
        onMouseLeave={menuHandleHoverOut}
          onMouseEnter={menuHandleHoverIn}
          className="hover:scale-107 duration-280 hover:border-black flex items-center justify-center gap-1  border-2 border-black/20 rounded-full px-5 py-1"
        >
          <div className="text-[24px] flex flex-col relative">
            <span className="menu_text_one">menu</span>
            <span className="absolute opacity-0 menu_text_two top-10 ">menu</span>
          </div>
          <FontAwesomeIcon className="text-[20px]" icon={faBarsStaggered} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
