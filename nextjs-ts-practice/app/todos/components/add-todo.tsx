"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";

export default function AddTodo() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex dark:bg-white dark:bg-opacity-50">
      <div
        className="w-1/2 h-full hover:cursor-pointer"
        onClick={router.back}></div>
      <div
        className={`bg-slate-200 w-1/2 h-full transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } dark:bg-slate-800`}>
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-4 dark:text-slate-200">
            Add To Do
          </h2>
          <input
            type="text"
            placeholder="Task"
            className="p-2 rounded-md mb-4 w-full"
          />
          <Button variant="blue" className="mr-2">
            Submit
          </Button>
          <Button onClick={handleClose} variant="red">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
