"use state";

import { useState } from "react";

interface InputGroupProps {
  formAction: (formData: FormData) => void;
  inputId?: string;
  inputName: string;
  label?: string;
  className?: string;
}

export default function InputGroup({
  formAction,
  inputId,
  inputName,
  label,
  className,
}: InputGroupProps) {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form
      action={formAction}
      className={`flex w-full justify-center items-center ${className}`}>
      <label
        htmlFor="groupName"
        className="text-xl font-bold whitespace-nowrap">
        {label}
      </label>
      <div className="flex w-full h-full">
        <input
          id={inputId ?? inputName}
          name={inputName}
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full h-full border ml-2 p-2 rounded-md"
        />
      </div>
      <div className="h-full">
        <button
          type="submit"
          className="flex justify-center items-center h-full ml-2 p-2 bg-green-500 text-white rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
}
