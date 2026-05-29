import { useEffect, useMemo, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { TodoFilters } from "./TodoFilters";
import { filterTodos } from "../utils/filterTodo";
import { useTodo } from "../hooks/useTodo";

export const Todos = (): JSX.Element => {
  const { todos } = useTodo();
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(
    () => filterTodos(todos, selectedStatus),
    [todos, selectedStatus],
  );

  return (
    <div className=" flex-7 flex flex-col gap-3 items-center bg-gray-100 overflow-hidden min-h-0 p-4">
      <TodoForm />
      <div className=" w-full max-w-lg bg-white shadow-lg rounded-lg p-4 flex flex-col flex-1 overflow-hidden min-h-0">
        {todos.length == 0 ? (
          <h1>No Todo,Please Add </h1>
        ) : (
          <>
            <ul className="flex flex-col gap-1.5 overflow-y-auto flex-1 min-h-0">
              {filteredTodos.map((todo) => {
                const today = new Date().toLocaleDateString();
                return (
                  todo.date === today && (
                    <li key={todo.id}>
                      <TodoItem todo={todo} />
                    </li>
                  )
                );
              })}
            </ul>
            <TodoFilters
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </>
        )}
      </div>
    </div>
  );
};
