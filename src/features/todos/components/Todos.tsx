import { useMemo, useState } from "react";
import type { JSX } from "react/jsx-runtime";

import type { LocalTodo } from "../types/todo.types";
import { useTheme } from "../context/ThemeContext";
import { useTodoSelector } from "../hooks/useTodoSelector";

import { TodoForm } from "./TodoForm";
import TodoList from "./TodoList";

export const Todos = (): JSX.Element => {
  const todos = useTodoSelector((state) => state.todos);

  const [selectedStatus, setSelectedStatus] = useState<
    "All" | "Incomplete" | "Complete"
  >("All");

  const { theme, toggleTheme } = useTheme();

  function filterTodos(todos: LocalTodo[], selectedStatus: string) {
    if (selectedStatus === "All") return todos;
    else if (selectedStatus === "Complete")
      return todos.filter((todo) => todo.completed === true);
    else if (selectedStatus === "Incomplete")
      return todos.filter((todo) => todo.completed === false);
  }

  const filteredTodos = useMemo(
    () => filterTodos(todos, selectedStatus),
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
