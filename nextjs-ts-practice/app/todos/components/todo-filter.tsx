"use client";

import { Select } from "@/components";
import { TodoCategory, TodoPriority } from "../todo-type";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categories: TodoCategory[] = [
  "household",
  "work",
  "personal",
  "errands",
  "study",
  "health",
  "hobbies",
  "finance",
  "projects",
];

const priorities: TodoPriority[] = ["high", "medium", "low"];

const params = new URLSearchParams();

export default function TodoFilter() {
  const [selectedCategory, setSelectedCategory] = useState<TodoCategory | "">(
    ""
  );
  const [selectedPriority, setSelectedPriority] = useState<TodoPriority | "">(
    ""
  );
  const router = useRouter();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "category") setSelectedCategory(value as TodoCategory);
    else if (name === "priority") setSelectedPriority(value as TodoPriority);

    if (value === "") params.delete(name);
    else params.set(name, value);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-5 pl-5 pb-5">
      <Select
        name="category"
        onChange={handleSelectChange}
        value={selectedCategory}
        style="filled"
        className="w-48">
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Select
        name="priority"
        onChange={handleSelectChange}
        value={selectedPriority}
        style="filled"
        className="w-48">
        <option value="">Select Priority</option>
        {priorities.map((prority) => (
          <option key={prority} value={prority}>
            {prority}
          </option>
        ))}
      </Select>
    </div>
  );
}
