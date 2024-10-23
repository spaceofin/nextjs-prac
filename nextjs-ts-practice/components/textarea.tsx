import { forwardRef } from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  style?: "default";
  children?: React.ReactNode;
};

const Textarea = forwardRef(function Textarea(
  { style = "default", children, ...props }: TextareaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  const styles = {
    default:
      "w-full text-xl h-20 rounded-md shadow-sm bg-white dark:border-gray-700 dark:bg-white-950 px-1 dark:text-slate-800",
  };
  return (
    <textarea
      ref={ref}
      {...props}
      className={`${
        styles[style as keyof typeof styles] ?? styles["default"]
      } ${props.className}`}>
      {children}
    </textarea>
  );
});

export default Textarea;
