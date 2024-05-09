"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import NavItem from "./NavItem";
import AuthLinks from "./AuthLinks";
import MenuBar from "./MenuBar";
const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const Links = [
    { key: "home", href: "/", name: "home" },
    { key: "dashboard", href: "/dashboard", name: "dashboard" },
  ];

  return (
    <div className="bg-slate-200 dark:bg-slate-800 flex items-center py-1 min-h-[var(--nav-h)] relative">
      <div className="container flex items-center flex-wrap justify-between gap-4">
        <Link href="/" className="flex-0">
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
        <ul className="hidden md:flex flex-grow md:justify-center items-center gap-12 overflow-y-auto">
          {Links.map((link) => (
            <NavItem
              key={link.key}
              link={link}
              setSidebarOpen={setSidebarOpen}
            />
          ))}
        </ul>
        <div className="hidden md:block">
          <AuthLinks setSidebarOpen={setSidebarOpen} />
        </div>
        <MenuBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        Links={Links}
      />
    </div>
  );
};

export default Navbar;
