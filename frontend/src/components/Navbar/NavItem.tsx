import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type NavItemProps = {
  link: {
    href: string;
    name: string;
  };
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const NavItem = ({ link, setSidebarOpen }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === link.href;
  return (
    <li className="list-none">
      <Link
        onClick={() => setSidebarOpen(false)}
        href={link.href}
        className={
          "hover:font-semibold transition-all text-black dark:text-slate-100 capitalize " +
          (isActive
            ? "font-semibold border-b-2 border-black dark:border-slate-50"
            : "font-normal")
        }
      >
        {link.name}
      </Link>
    </li>
  );
};

export default NavItem;
