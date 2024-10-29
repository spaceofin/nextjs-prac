import { Todo } from "../todo-type";

function convertTo12HourFormat(time: string) {
  const [hour24, minutes] = time.split(":").map(Number);

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = (hour24 % 12 || 12).toString().padStart(2, "0");

  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export default function TodoCard({ todo }: { todo: Todo }) {
  const startTime = todo?.dates?.startTime
    ? convertTo12HourFormat(todo.dates.startTime)
    : "";
  const endTime = todo?.dates?.endTime
    ? convertTo12HourFormat(todo.dates.endTime)
    : "";

  return (
    <div className="flex flex-col py-7 px-10 bg-gray-200 rounded-md box-border font-mono gap-2">
      <h3 className="text-xl font-bold">{todo.task}</h3>
      <div className="flex gap-2">
        <span className="bg-white p-1 px-2 rounded-md ">{todo.category}</span>
        <span className="bg-white p-1 px-2 rounded-md ">{todo.priority}</span>
      </div>
      <div className="flex gap-10 mt-2">
        <div>
          <span className="bg-green-400 p-1 px-2 rounded-md text-green-950 mr-2">
            START
          </span>
          {todo.dates.startDate}
          {" " + startTime}
        </div>
        <div>
          <span className="bg-red-400 p-1 px-2 rounded-md text-red-950 mr-2">
            END
          </span>
          {todo.dates.endDate}
          {" " + endTime}
        </div>
      </div>
      <div>{todo.memo}</div>
    </div>
  );
}
