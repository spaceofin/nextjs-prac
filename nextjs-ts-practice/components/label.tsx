export default function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  return (
    <label
      {...props}
      className={`block text-gray-700 dark:text-gray-300 font-bold ${props.className}`}
    />
  );
}
