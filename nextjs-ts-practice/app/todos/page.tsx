import TodoCard from "./components/todo-card";
import { Todo } from "./todo-type";

async function getTodos(): Promise<Todo[]> {
  const response = await fetch("http://localhost:3001/todos");
  const todos = await response.json();
  return todos;
}

export default async function Todos() {
  const todos = await getTodos();
  return (
    <div className="px-10 py-14 border-2 border-white bg-cyan-100 rounded bg-opacity-70 dark:text-slate-800 min-h-screen w-full ">
      {todos.map((todo) => (
        <TodoCard todo={todo} />
      ))}
    </div>
  );
}
