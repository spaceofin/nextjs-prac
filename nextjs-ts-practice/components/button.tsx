import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default";
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
      "bg-orange-400 text-white dark:bg-slate-600 dark:text-white rounded-md hover:bg-slate-600 hover:text-orange-400 dark:hover:bg-blue-700 dark:hover:text-green-200",
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
