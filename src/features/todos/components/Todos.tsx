import { useMemo, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { TodoForm } from "./TodoForm";
import { filterTodos } from "../utils/filterTodo";
import { useTodo } from "../hooks/useTodo";
import TodoListPanel from "./TodoListPanel";

export const Todos = (): JSX.Element => {
  const { todos } = useTodo();
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredTodos = useMemo(
    () => filterTodos(todos, selectedStatus),
    [todos, selectedStatus],
  );

  return (
    <div className=" flex-7 flex flex-col gap-3 items-center bg-gray-100 overflow-hidden min-h-0 p-4">
      <TodoForm />
      <TodoListPanel
        filteredTodos={filteredTodos}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  );
};
