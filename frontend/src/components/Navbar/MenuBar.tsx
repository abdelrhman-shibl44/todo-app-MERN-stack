import React from "react";
import Button from "../ui-controls/Button";
const MenuBar = ({
  setSidebarOpen,
  sidebarOpen,
}: {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}) => {
  return (
    <div className="md:hidden">
      <Button
        title="menu-bar"
        className="text-black flex flex-col justify-center gap-2 h-6 ease-in dark:text-slate-100 focus:outline-none"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <span
          className={
            `${
              sidebarOpen ? "rotate-45 absolute duration-500" : "duration-300"
            }` + " h-1 w-7 bg-slate-800 dark:bg-slate-50 rounded-md"
          }
        ></span>
        <span
          className={
            `${
              sidebarOpen ? "scale-0 opacity-0 duration-300" : "duration-300"
            }` + " h-1 w-7 bg-slate-800 dark:bg-slate-50 rounded-md"
          }
        ></span>
        <span
          className={
            `${
              sidebarOpen ? "-rotate-45 absolute duration-500" : "duration-500"
            }` + " h-1 w-7 bg-slate-800 dark:bg-slate-50 rounded-md"
          }
        ></span>
      </Button>
    </div>
  );
};

export default MenuBar;
