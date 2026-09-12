import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <div className="fixed px-12 pt-3  border items-center  bg-[#F5E3CD] uppercase flex left-0 w-full justify-between">
      <div className="text-7xl text-[#F91814] [-webkit-text-stroke:2.5px_white] font-modak">
        BUNZ
      </div>
      <div className="flex gap-4 font-mouse items-center">
        <span className=" flex items-center justify-center text-[24px] px-5 py-1 font-light text-[#F5E3CD]  bg-[#F91814] rounded-full ">
          <a className="" href="">
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
