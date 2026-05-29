import { useEffect, useMemo, useReducer, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
import { reducer } from "../utils/reducer";
import { TodoForm } from "./TodoForm";
import { TodoFilters } from "./TodoFilters";
import { filterTodos } from "../utils/filterTodo";
import type { Todo } from "../types/todo.types";

function init() {
  const data = localStorage.getItem("todos");
  if (!data) return [];

  //after getting data filter and remove todos which are not having today's date
  const todos: Todo[] = JSON.parse(data);
  const today = new Date().toLocaleDateString();
  return todos.filter((todo) => todo.date === today);
}
export const Todos = (): JSX.Element => {
  const [todos, dispatch] = useReducer(reducer, [], init);

  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(
    () => filterTodos(todos, selectedStatus),
    [todos, selectedStatus],
  );

  function handleDelete(id: string) {
    dispatch({ type: "DELETE", payload: { id: id } });
  }

  function handleStatusChange(
    id: string,
    currentStatus: "Incomplete" | "Complete",
  ) {
    dispatch({
      type: "UPDATE",
      payload: {
        id,
        status: currentStatus === "Incomplete" ? "Complete" : "Incomplete",
      },
    });
  }

  function handleUpdate(id: string, text: string) {
    if (text && text.trim() !== "")
      dispatch({
        type: "UPDATE",
        payload: { id, text },
      });
  }

  return (
    <div className=" flex-[7] flex flex-col gap-3 items-center bg-gray-100 overflow-hidden min-h-0 p-4">
      <TodoForm dispatch={dispatch} />
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
                      <TodoItem
                        todo={todo}
                        handleDelete={() => handleDelete(todo.id)}
                        handleStatusChange={() =>
                          handleStatusChange(todo.id, todo.status)
                        }
                        handleUpdate={handleUpdate}
                      />
                    </li>
                  )
                );
              })}
            </ul>
            <TodoFilters setSelectedStatus={setSelectedStatus} />
          </>
        )}
      </div>
    </div>
  );
};
