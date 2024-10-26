"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, Label, Select, Textarea } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { todoCategories, todoPriorities } from "../constants";
import { Todo } from "../todo-type";
import { createTodo } from "../todoApi";

export default function AddTodo() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<Todo>();
  const dateOnly = watch("dates.dateOnly");

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.push("/todos");
    }, 300);
  };

  const onSubmit: SubmitHandler<Todo> = async (todo: Todo) => {
    try {
      const result = await createTodo(todo);
      console.log(result);
      alert("New Todo Created!");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex dark:bg-white dark:bg-opacity-50">
      <div
        className="w-1/2 xl:w-2/3 h-full hover:cursor-pointer"
        onClick={router.back}></div>
      <div
        className={`bg-slate-200 w-1/2 xl:w-1/3 h-full transform transition-transform duration-150 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } dark:bg-slate-700`}>
        <form className="p-10" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-4 dark:text-slate-200">
            Add To Do
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Task</Label>
              <Input {...register("task")} type="text" placeholder="Task" />
            </div>
            <div className="flex items-center gap-2">
              <Label>Date Only</Label>
              <Input
                {...register("dates.dateOnly")}
                type="checkbox"
                className="w-5 h-5"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <div className="flex gap-2">
                <Input {...register("dates.startDate")} type="date" />
                {!dateOnly && (
                  <Input
                    {...register("dates.startTime")}
                    type="text"
                    placeholder="HH:mm"
                    className="w-1/3"
                  />
                )}
              </div>
            </div>
            <div>
              <Label>End Date</Label>
              <div className="flex gap-2">
                <Input {...register("dates.endDate")} type="date" />
                {!dateOnly && (
                  <Input
                    {...register("dates.endTime")}
                    type="text"
                    placeholder="HH:mm"
                    className="w-1/3"
                  />
                )}
              </div>
            </div>
            <div>
              <Label>Category</Label>
              <Select {...register("category")} className="w-1/3 pl-1">
                <option value="">-- Select --</option>
                {todoCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select {...register("priority")} className="w-1/3 pl-1">
                <option value="">-- Select --</option>
                {todoPriorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label>Memo</Label>
              <Textarea {...register("memo")} />
            </div>
          </div>
          <div className="my-10">
            <Button variant="blue" className="mr-2">
              Submit
            </Button>
            <Button type="button" onClick={handleClose} variant="red">
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
