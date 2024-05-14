import React from "react";
type InputProps = {
  className?: string;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputRef?: React.LegacyRef<HTMLInputElement>;
  value?: string;
  disable?: boolean;
  checked?: boolean;
};
const Input = (props: InputProps) => {
  return (
    <input
      className={
        props.className
          ? props.className
          : "p-2 rounded-md dark:bg-slate-800 w-full outline-none focus:border-t-2 border-orange-500 dark:text-white"
      }
      ref={props?.inputRef}
      type={props?.type}
      name={props?.name}
      id={props?.id}
      placeholder={props?.placeholder}
      onChange={props?.onChange}
      value={props?.value}
      checked={props?.checked}
      disabled={props.disable}
    />
  );
};

export default Input;
