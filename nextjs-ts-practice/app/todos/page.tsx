import TodoCard from "./components/todo-card";
import AddTodo from "./components/add-todo";
import NewButton from "./components/new-button";
import { getTodos } from "./todoApi";

export default async function Todos({
  searchParams,
}: {
  searchParams: { new: string };
}) {
  const todos = await getTodos();
  const isAddTodoOpen = searchParams.new === "true";

  return (
    <div className="flex flex-col px-10 py-14 border-2 border-white bg-cyan-100 rounded bg-opacity-70 dark:text-slate-800 w-full h-full">
      {isAddTodoOpen && <AddTodo />}
      <div className="flex justify-end mb-2 mr-1">
        <NewButton />
      </div>
      <div className="flex flex-col gap-4 h-full overflow-y-auto my-10">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
