export default function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  return (
    <label
      {...props}
      className={`text-lg block mb-0.5 text-gray-700 dark:text-gray-300 font-bold ${props.className}`}
    />
  );
}
