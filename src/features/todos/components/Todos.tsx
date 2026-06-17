import { useMemo, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { TodoForm } from "./TodoForm";
import { useTodo } from "../hooks/useTodo";
import { filterTodaysTodos } from "../utils/filterTodaysTodo";
import TodoList from "./TodoList";
import type { Todo } from "../types/todo.types";
import { useTheme } from "../context/ThemeContext";

export const Todos = (): JSX.Element => {
  const { todos } = useTodo();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { theme, toggleTheme } = useTheme();

  function filterTodos(todos: Todo[], selectedStatus: string) {
    if (selectedStatus === "All") return todos;
    return todos.filter((todo) => todo.status === selectedStatus);
  }
  const filteredTodos = useMemo(
    () => filterTodaysTodos(filterTodos(todos, selectedStatus)),
    [todos, selectedStatus],
  );

  function handleThemeChange() {
    toggleTheme();
  }

  return (
    <div
      className={`flex-7 flex flex-col gap-3 items-center  overflow-hidden min-h-0 p-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
    >
      <TodoForm />
      <TodoList
        filteredTodos={filteredTodos}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <button
        className="px-4 py-2 rounded-md font-semibold transition-colors bg-white text-black border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 "
        onClick={handleThemeChange}
      >
        {theme == "dark" ? "Light Mode Button" : "Dark Mode Button"}
      </button>
    </div>
  );
};
