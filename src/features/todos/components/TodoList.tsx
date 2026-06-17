import React from "react";

import { useTodo } from "../hooks/useTodo";
import type { Todo } from "../types/todo.types";
import { useTheme } from "../context/ThemeContext";

import { TodoFilters } from "./TodoFilters";
import TodoItem from "./TodoItem";

type TodoListProps = {
  filteredTodos: Todo[];
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
};

const TodoList = ({
  filteredTodos,
  selectedStatus,
  setSelectedStatus,
}: TodoListProps) => {
  const { todos } = useTodo();
  const { theme } = useTheme();

  return (
    <div
      className={` w-full max-w-lg  shadow-lg rounded-lg p-4 flex flex-col flex-1 overflow-hidden min-h-0 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}
    >
      {todos.length == 0 ? (
        <h1>No Todo,Please Add </h1>
      ) : (
        <>
          <TodoFilters
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <ul className="flex flex-col gap-1.5 overflow-y-auto flex-1 min-h-0">
            {filteredTodos.map((todo) => {
              const dateOnly = todo.date.split(",")[0];
              const today = new Date().toLocaleDateString();
              return dateOnly === today ? (
                <li key={todo.id}>
                  {/* Hello */}
                  <TodoItem todo={todo} />
                </li>
              ) : (
                "Null"
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoList;
