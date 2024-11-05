import React from "react";
import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  style?: "default" | "filled";
  children?: React.ReactNode;
};

export default forwardRef(function Select(
  { style = "default", children, ...props }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  const styles = {
    default: "rounded-md text-xl bg-white",
    filled: "rounded-md text-xl bg-sky-600 bg-opacity-90 text-white py-2 px-4",
  };
  return (
    <select
      ref={ref}
      {...props}
      className={`${styles[style as keyof typeof styles]} ${props.className}`}>
      {children}
    </select>
  );
});
