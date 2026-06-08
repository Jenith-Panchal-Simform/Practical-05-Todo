import { useMemo, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { TodoForm } from "./TodoForm";
import { useTodo } from "../hooks/useTodo";
import { filterTodaysTodos } from "../utils/filterTodaysTodo";
import TodoList from "./TodoList";
import type { Todo } from "../types/todo.types";

export const Todos = (): JSX.Element => {
  const { todos } = useTodo();
  const [selectedStatus, setSelectedStatus] = useState("All");

  function filterTodos(todos: Todo[], selectedStatus: string) {
    if (selectedStatus === "All") return todos;
    return todos.filter((todo) => todo.status === selectedStatus);
  }
  const filteredTodos = useMemo(
    () => filterTodaysTodos(filterTodos(todos, selectedStatus)),
    [todos, selectedStatus],
  );

  return (
    <div className=" flex-7 flex flex-col gap-3 items-center bg-gray-100 overflow-hidden min-h-0 p-4">
      <TodoForm />
      <TodoList
        filteredTodos={filteredTodos}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  );
};
