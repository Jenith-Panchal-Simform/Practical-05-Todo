import React from "react";

import { useTheme } from "../context/ThemeContext";

import type { LocalTodo } from "../types/todoTypes";
import { useTodoSelector } from "../hooks/useTodoSelector";

import { TodoFilters } from "./TodoFilters";
import TodoItem from "./TodoItem";

type TodoListProps = {
  filteredTodos: LocalTodo[] | undefined;
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<
    React.SetStateAction<"All" | "Incomplete" | "Complete">
  >;
};

const TodoList = ({
  filteredTodos,
  selectedStatus,
  setSelectedStatus,
}: TodoListProps) => {
  const todos = useTodoSelector((state) => state.todos);
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
            {filteredTodos?.map((todo) => {
              return (
                <li key={todo.uid}>
                  <TodoItem todo={todo} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoList;
