"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, Label, Select, Textarea } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { todoCategories, todoPriorities } from "../constants";
import { InputTodo, Todo } from "../todo-type";
import { createTodo, getTodoById } from "../todoApi";
import { inputTodoSchema } from "../todo-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export default function AddInputTodo({
  todoIdToUpdate,
}: {
  todoIdToUpdate?: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InputTodo>({ resolver: zodResolver(inputTodoSchema) });
  const dateOnly = watch("dates.dateOnly");

  let todoToUpdate: Todo | null = null;

  useEffect(() => {
    console.log("updatetodo:", todoIdToUpdate);
    const fetchTodoById = async () => {
      if (todoIdToUpdate) {
        todoToUpdate = await getTodoById(todoIdToUpdate);
        // console.log(todoToUpdate);
        const {
          task,
          category,
          priority,
          startTimeStamp,
          endTimeStamp,
          memo,
          status,
        } = todoToUpdate;
        const [startDate, startTime] = startTimeStamp.slice(0, -4).split("T");
        const [endDate, endTime] = endTimeStamp.slice(0, -4).split("T");

        const dateOnly =
          startTime === "00:00" && endTime === "00:00" ? true : false;

        setValue("task", task);
        setValue("category", category);
        setValue("priority", priority);
        setValue("dates.startDate", startDate);
        setValue("dates.startTime", startTime);
        setValue("dates.endDate", endDate);
        setValue("dates.endTime", endTime);
        setValue("memo", memo);
        // setValue("status", status);
        setValue("dates.dateOnly", dateOnly);
      }
    };
    fetchTodoById();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.push("/todos");
    }, 300);
  };

  const onSubmit: SubmitHandler<InputTodo> = async (todo: InputTodo) => {
    try {
      if (todoToUpdate) {
        //
      } else {
        const result = await createTodo(todo);
        console.log("created:", result);
      }
    } catch (error) {
      console.error("Failed to process InputTodo:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex dark:bg-white dark:bg-opacity-50">
      <div
        className="w-1/2 xl:w-2/3 h-full hover:cursor-pointer"
        onClick={router.back}></div>
      <div
        className={`bg-slate-200 w-1/2 xl:w-1/3 h-full transform transition-transform duration-300 ${
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
            <p className="dark:text-white">{errors.task?.message}</p>
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
              <p className="dark:text-white">
                {errors.dates?.startDate?.message}
              </p>
              <p className="dark:text-white">
                {errors.dates?.startTime?.message}
              </p>
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
              <p className="dark:text-white">
                {errors.dates?.endDate?.message}
              </p>
              <p className="dark:text-white">
                {errors.dates?.endTime?.message}
              </p>
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
              <p className="dark:text-white">{errors.category?.message}</p>
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
              <p className="dark:text-white">{errors.priority?.message}</p>
            </div>

            <div>
              <Label>Memo</Label>
              <Textarea {...register("memo")} />
              <p className="dark:text-white">{errors.memo?.message}</p>
            </div>
            <p className="dark:text-white">{errors.dates?.dateOnly?.message}</p>
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
