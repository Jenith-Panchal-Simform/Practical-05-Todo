import type { Todo } from "../types/todo.types";

export function init() {
  const data = localStorage.getItem("todos");
  if (!data) return [];

  //after getting data filter and remove todos which are not having today's date
  const todos: Todo[] = JSON.parse(data);
  const today = new Date().toLocaleDateString();
  return todos.filter((todo) => todo.date === today);
}
