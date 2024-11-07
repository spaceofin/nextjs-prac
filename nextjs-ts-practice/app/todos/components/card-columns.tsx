"use client";

import { Todo } from "../todo-type";
import TodoCard from "./todo-card";
import { useState, useEffect } from "react";
import { updateTodoStatus } from "../todoApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TodoCategory, TodoPriority } from "../todo-type";
import { getTodos } from "../todoApi";

export default function CardColumns({
  category,
  priority,
}: {
  category?: TodoCategory;
  priority?: TodoPriority;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [todoCards, setTodoCards] = useState<Todo[]>();
  const [doneCards, setDoneCards] = useState<Todo[]>();

  useEffect(() => {
    setIsLoading(true);
    const fetchTodos = async () => {
      try {
        const filteredTodos = await getTodos({ category, priority });
        setTodoCards(filteredTodos.filter((todo) => todo.status === "todo"));
        setDoneCards(filteredTodos.filter((todo) => todo.status === "done"));
      } catch (error) {
        console.log("Error fetching todos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [category, priority]);

  const onDrop = async (e: React.DragEvent<HTMLDivElement>, divId: string) => {
    e.preventDefault();
    const todoId = parseInt(e.dataTransfer.getData("text/plain"), 10);

    const movedTodo =
      todoCards?.find((todo) => todo.id === todoId) ||
      doneCards?.find((todo) => todo.id === todoId);

    if (!movedTodo) return;

    if (divId === "div2" && todoCards?.includes(movedTodo)) {
      await updateTodoStatus(todoId, "done");
      setTodoCards((prev) => prev?.filter((todo) => todo.id !== todoId));
      setDoneCards((prev) => [...(prev ?? []), movedTodo]);
    } else if (divId === "div1" && doneCards?.includes(movedTodo)) {
      await updateTodoStatus(todoId, "todo");
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
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <AiOutlineLoading3Quarters className="animate-spin text-7xl text-gray-100" />
        </div>
      )}
      {!isLoading && (
        <div className="flex gap-5 h-full pb-20">
          <div
            className="flex flex-col gap-4 h-full w-1/2 overflow-y-auto my-5"
            id="div1"
            onDrop={(e) => onDrop(e, "div1")}
            onDragOver={onDragOver}>
            {todoCards?.map((todo) => (
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
      )}
    </>
  );
}
