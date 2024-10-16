import { forwardRef } from "react";

export default forwardRef(function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const styles = {
    default:
      "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-white-950 px-1 dark:text-slate-800",
  };
  return (
    <input
      ref={ref}
      {...props}
      className={`${
        styles[props.type as keyof typeof styles] ?? styles["default"]
      } ${props.className}`}
    />
  );
});
