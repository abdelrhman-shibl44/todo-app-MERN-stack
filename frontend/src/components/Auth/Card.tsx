import React from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="flex flex-col border-t-4 border-[#08d3c6] shadow-lg shadow-black-50 justify-center bg-slate-200 dark:bg-black min-w-full md:min-w-[35rem] md:min-h-[18.75rem] text-slate-800 rounded-md p-6">
      <div className="flex-0 p-2 pb-4 text-center text-head_two">
        <h2 className="font-semibold dark:text-slate-50">{title}</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center">{children}</div>
    </div>
  );
};

export default Card;
