import type { Todo } from "../types/todo.types";

export function filterTodaysTodos(todos: Todo[]): Todo[] {
  const today = new Date().toLocaleDateString();

  return todos.filter((todo) => todo.date === today);
}
