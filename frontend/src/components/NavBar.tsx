// need to build the nave bar 

import { ReactElement, useState } from "react";
import { MenuIcon } from "../icons/MenIcon";

interface NavInput {
  text1: string;
  icon1?: ReactElement;
  menuProp: text2[];
}

interface text2 {
  text2: string;
  icon2: ReactElement;
}

export const NavBar = (prop: NavInput) => {
  const [showMenu, setShowMenu] = useState(false);

  function toggle() {
    setShowMenu((e) => (e = !e));
  }

  return (
    <div className="flex justify-center m">
      <div className="bg-linear-to-bl from-[#0c0eff] to-[#5676ff] text-[#ffe3e7] text-2xl p-3 rounded-md mt-1 flex justify-between items-center md:w-190 w-80 relative">
        <div className="flex items-center text-center cursor-pointer">
          {prop.text1}
          {prop.icon1}
        </div>
        <div className="md:flex items-center hidden ">
          {prop.menuProp.map((items, key) => (
            <div className="mr-2 flex items-center cursor-pointer" key={key}>
              {items.icon2}
              {items.text2}
            </div>
          ))}
        </div>
        <div className="md:hidden flex ">
          {showMenu ? (
            <div className="rounded-md h-fit relative w-40 transition-all ease-in duration-300   absolute bg-black ">
              <div
                className="absolute right-1 top-0 cursor-pointer"
                onClick={toggle}
              >
                {" "}
                x{" "}
              </div>
              {prop.menuProp.map((items, key) => (
                <div className=" flex items-center cursor-pointer" key={key}>
                  {items.icon2}
                  {items.text2}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="transition-all ease-in duration-300 "
              onClick={toggle}
            >
              <MenuIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
