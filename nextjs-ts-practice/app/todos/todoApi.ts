"use server";

import { InputTodo, Todo } from "./todo-type";
import { todoSchema } from "./todo-schema";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch("http://localhost:3001/todos", {
    cache: "no-store",
  });
  const todos = await response.json();
  return todos;
}

export async function getTodoById(id: string): Promise<Todo> {
  const response = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch todo with id ${id}`);
  }

  const todo = await response.json();
  return todo;
}

export const createTodo = async (inputTodo: InputTodo) => {
  const { dates, ...rest } = inputTodo;
  const startTimeStamp = `${dates.startDate}T${
    dates.dateOnly ? "00:00:00" : `${dates.startTime}:00`
  }Z`;
  const endTimeStamp = `${dates.endDate}T${
    dates.dateOnly ? "00:00:00" : `${dates.endTime}:00`
  }Z`;

  const todo = { ...rest, startTimeStamp, endTimeStamp };
  // console.log(todo);
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

export const updateTodo = async (
  id: string,
  updatedFields: Partial<InputTodo>
) => {
  let payload: Partial<Todo>;

  if (updatedFields.hasOwnProperty("dates") && updatedFields.dates) {
    const dates = updatedFields.dates;
    const startTimeStamp = `${dates.startDate}T${
      dates.dateOnly ? "00:00:00" : `${dates.startTime}:00`
    }Z`;
    const endTimeStamp = `${dates.endDate}T${
      dates.dateOnly ? "00:00:00" : `${dates.endTime}:00`
    }Z`;

    delete updatedFields.dates;
    payload = { ...updatedFields, startTimeStamp, endTimeStamp };
  } else {
    payload = { ...updatedFields };
  }

  const response = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  const result = await response.json();
  return result;
};

export const updateTodoStatus = async (id: number, status: string) => {
  const response = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo status");
  }

  const result = await response.json();
  return result;
};
