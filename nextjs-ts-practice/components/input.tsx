import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  style?: "default" | "checkbox" | "text" | "date";
  children?: React.ReactNode;
};

export default forwardRef(function Input(
  { style = "default", children, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const styles = {
    default:
      "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-white-950 px-1 dark:text-slate-800",
    checkbox: "",
    text: "w-full text-xl px-1 rounded-md",
    date: "w-full text-xl rounded-md px-1 ",
  };
  return (
    <input
      ref={ref}
      {...props}
      className={`${
        styles[props.type as keyof typeof styles] ?? styles["default"]
      } ${props.className}`}>
      {children}
    </input>
  );
});
