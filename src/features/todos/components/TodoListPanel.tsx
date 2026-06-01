import React from "react";
import { TodoFilters } from "./TodoFilters";
import { useTodo } from "../hooks/useTodo";
import type { Todo } from "../types/todo.types";
import TodoItem from "./TodoItem";

type TodoListPanelProps = {
  filteredTodos: Todo[];
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
};

const TodoListPanel = ({
  filteredTodos,
  selectedStatus,
  setSelectedStatus,
}: TodoListPanelProps) => {
  const { todos } = useTodo();
  return (
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
  );
};

export default TodoListPanel;
