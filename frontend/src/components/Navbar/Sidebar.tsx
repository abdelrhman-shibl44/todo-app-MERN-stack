import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavItem from "./NavItem";
import AuthLinks from "./AuthLinks";
import ThemeToggle from "../ui-controls/ThemeToggle";
type SidebarProps = {
  Links: {
    key: string;
    name: string;
    href: string;
  }[];
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar = ({ sidebarOpen, setSidebarOpen, Links }: SidebarProps) => {
  return (
    <div
      className={
        sidebarOpen
          ? `fixed md:hidden top-0 left-0 bg-white dark:bg-gray-900 h-full w-[80%] z-50 duration-300 ease-in`
          : `fixed md:hidden top-0 left-[-100%] bg-white dark:bg-gray-900 h-full w-[100%] z-50 duration-300`
      }
    >
      <div className="flex flex-col items-start gap-6 p-4 relative">
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute right-6 top-[1.5rem] flex flex-col justify-center items-center gap-2 cursor-pointer p-2"
        >
          <span className="h-[2px] w-5 bg-slate-800 dark:bg-slate-50 rounded-md rotate-45 absolute "></span>
          <span className="h-[2px] w-5 bg-slate-800 dark:bg-slate-50 rounded-md -rotate-45 absolute "></span>
        </div>
        <Link onClick={() => setSidebarOpen(false)} href="/" className="flex-0">
          <h1 className="relative w-[70px] h-[70px]">
            <Image
              className="absolute object-cover dark:backdrop-invert"
              src="/logo.webp"
              fill
              alt="logo"
              loading="eager"
              priority={true}
              sizes="100px"
            />
          </h1>
        </Link>
        <ul className="flex flex-col gap-4">
          {Links.map((link) => (
            <NavItem
              key={link.key}
              link={link}
              setSidebarOpen={setSidebarOpen}
            />
          ))}
        </ul>
        <AuthLinks setSidebarOpen={setSidebarOpen} />
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Sidebar;
