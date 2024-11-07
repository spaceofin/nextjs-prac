import { getTodos } from "../todoApi";
import { TodoCategory, TodoPriority } from "../todo-type";
import CardColumns from "./card-columns";

export default async function CardColumnsWrapper({
  category,
  priority,
}: {
  category?: TodoCategory;
  priority?: TodoPriority;
}) {
  const todos = await getTodos({ category, priority });
  return <CardColumns todos={todos} />;
}
