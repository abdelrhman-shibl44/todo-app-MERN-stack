import React from "react";

// Define TypeScript types for option and props
type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  title: string;
  value: string;
  options: Option[];
  name: string;
  defaultVal: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  title,
  options,
  defaultVal,
  name,
  onChange,
  className,
}) => {
  return (
    <div className="!m-0">
      <label
        htmlFor="select"
        className="block text-sm font-medium text-gray-500 dark:text-gray-700"
      >
        {title}
      </label>
      <select
        defaultValue={defaultVal}
        name={name}
        id="select"
        className={
          className
            ? className
            : "p-2 rounded-md bg-blue-900/40 w-full outline-none focus:border-t-2 border-blue-500 text-lavender-color placeholder-lavender-color/70"
        }
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            className="text-purple-color font-semibold"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
