export default function Textarea(
  props: React.InputHTMLAttributes<HTMLTextAreaElement>
) {
  const styles = {
    default:
      "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-white-950 px-1 dark:text-slate-800",
  };
  return (
    <textarea
      {...props}
      className={`${
        styles[props.type as keyof typeof styles] ?? styles["default"]
      } ${props.className}`}
    />
  );
}
