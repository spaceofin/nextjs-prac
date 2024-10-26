import React from "react";
import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  style?: "default";
  children?: React.ReactNode;
};

export default forwardRef(function Select(
  { style = "default", children, ...props }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  const styles = {
    default: "rounded-md text-xl bg-white",
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
