"use client";

import { Todo } from "../todo-type";
import TodoCard from "./todo-card";
import { useState } from "react";

export default function CardColumns({ todos }: { todos: Todo[] }) {
  const [todoCards, setTodoCards] = useState<Todo[]>(todos);
  const [doneCards, setDoneCards] = useState<Todo[]>();

  const onDrop = (e: React.DragEvent<HTMLDivElement>, divId: string) => {
    e.preventDefault();
    const todoId = parseInt(e.dataTransfer.getData("text/plain"), 10);

    const movedTodo =
      todoCards.find((todo) => todo.id === todoId) ||
      doneCards?.find((todo) => todo.id === todoId);

    if (!movedTodo) return;

    if (divId === "div2" && todoCards.includes(movedTodo)) {
      setTodoCards((prev) => prev.filter((todo) => todo.id !== todoId));
      setDoneCards((prev) => [...(prev ?? []), movedTodo]);
    } else if (divId === "div1" && doneCards?.includes(movedTodo)) {
      setDoneCards((prev) => prev?.filter((todo) => todo.id !== todoId));
      setTodoCards((prev) => [...(prev ?? []), movedTodo]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <>
      <div className="grid grid-cols-2 text-2xl font-bold">
        <h2 className="pl-5">TO-DO</h2>
        <h2 className="pl-10">DONE</h2>
      </div>
      <div className="flex gap-5 h-full pb-20">
        <div
          className="flex flex-col gap-4 h-full w-1/2 overflow-y-auto my-5"
          id="div1"
          onDrop={(e) => onDrop(e, "div1")}
          onDragOver={onDragOver}>
          {todoCards.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>

        <div
          className="flex flex-col gap-4 h-full w-1/2 overflow-y-auto my-5"
          id="div2"
          onDrop={(e) => onDrop(e, "div2")}
          onDragOver={onDragOver}>
          {doneCards?.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </>
  );
}