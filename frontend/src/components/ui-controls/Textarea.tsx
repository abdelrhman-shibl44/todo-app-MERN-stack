import React from "react";

type TextareaProps = {
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  disable?: boolean;
  inputRef?: React.LegacyRef<HTMLTextAreaElement>;
  aria?: string;
  required?: boolean;
  type?: string;
};
const Textarea = (props: TextareaProps) => {
  return (
    <textarea
      rows={3}
      ref={props?.inputRef}
      aria-describedby={props?.aria}
      className={
        props.className
          ? props.className
          : "p-2 rounded-md bg-blue-900/40 w-full outline-none focus:border-t-2 border-blue-500 text-lavender-color placeholder-lavender-color/70"
      }
      name={props.name}
      id={props.id}
      placeholder={props?.placeholder}
      onChange={props.onChange}
      value={props?.value}
      disabled={props?.disable}
    />
  );
};

export default Textarea;
