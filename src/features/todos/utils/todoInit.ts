import { filterTodaysTodos } from "./filterTodaysTodo";

export function loadTodosFromStorage() {
  const data = localStorage.getItem("todos");
  if (!data) return [];

  return filterTodaysTodos(JSON.parse(data));
}
