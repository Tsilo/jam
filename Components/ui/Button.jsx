import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        "bg-blue-400 cursor-pointer hover:bg-blue-500 text-white rounded-lg px-4 py-2 disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
