export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const styles = {
    default:
      "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-white-950 px-1",
  };
  return (
    <input
      {...props}
      className={styles[props.type as keyof typeof styles] ?? styles["default"]}
    />
  );
}
