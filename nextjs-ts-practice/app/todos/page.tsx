import AddInputTodo from "./components/add-input-todo";
import NewButton from "./components/new-button";
import TodoFilter from "./components/todo-filter";
import { TodoCategory, TodoPriority } from "./todo-type";
import CardColumns from "./components/card-columns";
import EditInputTodo from "./components/edit-input-todo";

type SearchParams = {
  new?: string;
  edit?: string;
  category?: TodoCategory;
  priority?: TodoPriority;
};

export default function Todos({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const category = searchParams?.category;
  const priority = searchParams?.priority;
  const isAddTodoOpen = searchParams.new === "true";
  const editId = !isNaN(Number(searchParams.edit))
    ? searchParams.edit
    : undefined;

  return (
    <div className="flex flex-col px-10 py-14 border-2 border-white bg-cyan-100 rounded bg-opacity-70 dark:text-slate-800 w-full min-w-[64rem] h-full">
      {isAddTodoOpen && <AddInputTodo />}
      {editId && <EditInputTodo id={editId} />}
      <div className="flex justify-between mb-2 mr-1">
        <TodoFilter />
        <NewButton />
      </div>
      <CardColumns category={category} priority={priority} />
    </div>
  );
}
