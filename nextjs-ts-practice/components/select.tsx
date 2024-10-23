import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  style?: "default";
  children?: React.ReactNode;
};

export default function Select({
  style = "default",
  children,
  ...props
}: SelectProps) {
  const styles = {
    default: "rounded-md text-xl ",
  };
  return (
    <select
      {...props}
      className={`${styles[style as keyof typeof styles]} ${props.className}`}>
      {children}
    </select>
  );
}
