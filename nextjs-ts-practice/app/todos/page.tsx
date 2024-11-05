import AddTodo from "./components/add-input-todo";
import NewButton from "./components/new-button";
import { getTodos } from "./todoApi";
import CardColumns from "./components/card-columns";
import TodoFilter from "./components/todo-filter";

export default async function Todos({
  searchParams,
}: {
  searchParams: { new: string; edit: string };
}) {
  const todos = await getTodos();
  const isAddTodoOpen = searchParams.new === "true";
  const editParam = !isNaN(Number(searchParams.edit))
    ? searchParams.edit
    : undefined;

  return (
    <div className="flex flex-col px-10 py-14 border-2 border-white bg-cyan-100 rounded bg-opacity-70 dark:text-slate-800 w-full min-w-[64rem] h-full">
      {isAddTodoOpen && <AddTodo />}
      {editParam && <AddTodo todoIdToUpdate={editParam} />}
      <div className="flex justify-between mb-2 mr-1">
        <TodoFilter />
        <NewButton />
      </div>
      <CardColumns todos={todos} />
    </div>
  );
}
