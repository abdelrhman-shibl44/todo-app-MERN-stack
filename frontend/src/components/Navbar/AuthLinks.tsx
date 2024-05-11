import Link from "next/link";
import React, { useState } from "react";
import Button from "../ui-controls/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { logOut } from "@/app/redux/features/auth-slice";

type AuthLinksProps = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const AuthLinks = ({ setSidebarOpen }: AuthLinksProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="flex gap-4">
      {isAuth ? (
        <Button onClick={handleLogout} text="Logout" />
      ) : (
        <>
          <Link
            onClick={() => setSidebarOpen(false)}
            className="bg-slate-50 dark:bg-slate-900 hover:border-t-2 border-orange-500 md:p-2 rounded-md"
            href={"/auth/register"}
          >
            Register
          </Link>
          <Link
            onClick={() => setSidebarOpen(false)}
            className="bg-slate-50 dark:bg-slate-900 hover:border-t-2 border-orange-500 md:p-2 rounded-md"
            href={"/auth/login"}
          >
            LogIn
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
