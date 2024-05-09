import React, { MouseEvent } from "react";
import SpinnerLoading from "../ui-controls/SpinnerLoading";
type ButtonProps = {
  className?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  isFormLoading?: boolean;
  disabled?: boolean;
  text?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onChange?: () => void;
  children?: React.ReactNode;
};
const Button = ({
  className,
  isFormLoading,
  onChange,
  onClick,
  type,
  title,
  text,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      title={title && title}
      type={type ? type : "button"}
      className={
        className
          ? className
          : `w-fit mx-auto bg-slate-100 hover:shadow-lg shadow-slate-900  dark:bg-slate-700 hover:border-t-2 border-orange-500  text-slate-700 dark:text-white font-semibold p-2 px-6 rounded-md ${
              isFormLoading ? "opacity-50" : ""
            }`
      }
      onChange={onChange}
      onClick={onClick}
      disabled={disabled ? disabled : false}
    >
      {children ? (
        isFormLoading ? (
          <SpinnerLoading />
        ) : (
          children
        )
      ) : isFormLoading ? (
        <SpinnerLoading />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
