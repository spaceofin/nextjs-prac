import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "blue" | "red";
  size?: "small" | "medium" | "large";
  className?: string;
  children?: React.ReactNode;
};

export default function Button({
  variant = "default",
  size = "medium",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    default:
      "bg-orange-400 text-white rounded-md active:scale-95 dark:bg-slate-600 dark:text-white  hover:bg-slate-600 hover:text-orange-400 transition dark:hover:bg-orange-400 dark:hover:text-slate-700",
    blue: "px-4 py-2 bg-blue-400 text-white rounded-md active:scale-95 dark:bg-blue-200 dark:text-blue-700  hover:bg-slate-300 hover:text-blue-400 transition dark:hover:bg-blue-400 dark:hover:text-white",
    red: "px-4 py-2 bg-red-400 text-white rounded-md active:scale-95 dark:bg-red-200 dark:text-red-700  hover:bg-slate-300 hover:text-red-400 transition dark:hover:bg-red-400 dark:hover:text-white",
  };
  const sizes = {
    small: "text-md px-3 py-1 h-fit w-fit",
    medium: "text-lg px-4 py-1 h-fit w-fit",
    large: "text-2xl px-4 py-2 h-fit w-fit",
  };
  return (
    <button
      {...props}
      className={`${variants[variant as keyof typeof variants]} ${
        sizes[size as keyof typeof sizes]
      } ${className}`}></button>
  );
}
