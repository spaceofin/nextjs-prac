"use server";

import { Todo } from "./todo-type";
import { todoSchema } from "./todo-schema";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch("http://localhost:3001/todos");
  const todos = await response.json();
  return todos;
}

export const createTodo = async (todo: Todo) => {
  const validated = todoSchema.safeParse(todo);

  if (!validated.success) {
    const errorMessages = validated.error.errors.map((error) => error.message);
    const errorMessage = errorMessages.join(", ");
    console.log(errorMessage);
    throw new Error(`Invalid data: ${errorMessage}`);
  }

  const response = await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  const result = await response.json();
  return result;
};
