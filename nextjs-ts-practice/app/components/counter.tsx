"use client";

import React from "react";

type CounterProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  title: string;
};

export default function Counter({ count, setCount, title }: CounterProps) {
  return (
    <div className="flex justify-center mt-3 items-center">
      <button
        className="flex justify-center items-center bg-blue-400 w-6 h-6 rounded-md mx-2 "
        onClick={() => setCount(count - 1)}>
        −
      </button>
      <p className="text-lg">
        {title}: {count}
      </p>
      <button
        className="flex justify-center items-center bg-blue-400 w-6 h-6 rounded-md mx-2 "
        onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}
