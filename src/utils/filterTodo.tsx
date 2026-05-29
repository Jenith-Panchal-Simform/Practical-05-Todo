import type { Todo } from "../components/Todos";

export function filterTodos(
  todos: Todo[],
  selectedStatus: string
) {
  if (selectedStatus === "All") return todos;
  return todos.filter(
    (todo) => todo.status === selectedStatus
  );
}