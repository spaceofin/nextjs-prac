import { Todo } from "./todo-type";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch("http://localhost:3001/todos");
  const todos = await response.json();
  return todos;
}

export const createTodo = async (todo: Todo) => {
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
