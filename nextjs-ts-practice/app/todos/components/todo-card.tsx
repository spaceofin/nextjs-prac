import { Todo } from "../todo-type";

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };

  const formattedDate = date.toLocaleString("ko-KR", options);

  console.log(formattedDate);
  const result = formattedDate
    .replace(/\. /g, "-")
    .replace(/-(?=\s*오전|-?오후)/g, " ")
    .replace(/오전\s(\d{2}:\d{2})/, "$1 AM")
    .replace(/오후\s(\d{2}:\d{2})/, "$1 PM");
  return result;
}

export default function TodoCard({ todo }: { todo: Todo }) {
  const startDate = formatDate(todo.startTimeStamp);
  const endDate = formatDate(todo.endTimeStamp);

  return (
    <div
      className="flex flex-col py-7 px-10 bg-gray-200 rounded-md box-border font-mono gap-2"
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData("text/plain", todo.id.toString())
      }>
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
          {startDate}
        </div>
        <div>
          <span className="bg-red-400 p-1 px-2 rounded-md text-red-950 mr-2">
            END
          </span>
          {endDate}
        </div>
      </div>
      <div>{todo.memo}</div>
    </div>
  );
}
