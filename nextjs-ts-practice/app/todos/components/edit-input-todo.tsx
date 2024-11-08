import { getTodoById } from "../todoApi";
import AddInputTodo from "./add-input-todo";

export default async function EditInputTodo({ id }: { id: string }) {
  const todo = await getTodoById(id);
  const { startTimeStamp, endTimeStamp } = todo;
  const [startDate, startTime] = startTimeStamp.slice(0, -4).split("T");
  const [endDate, endTime] = endTimeStamp.slice(0, -4).split("T");
  const dateOnly = startTime === "00:00" && endTime === "00:00" ? true : false;

  const todoToUpdate = {
    ...todo,
    dates: {
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      dateOnly: dateOnly,
    },
  };

  return <AddInputTodo todoToUpdate={todoToUpdate} />;
}
