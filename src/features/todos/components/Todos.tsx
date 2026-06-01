import { useEffect, useMemo, useReducer, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
import { reducer } from "../utils/reducer";
import { TodoForm } from "./TodoForm";
import { TodoFilters } from "./TodoFilters";
import { filterTodos } from "../utils/filterTodo";
import { loadTodosFromStorage } from "../utils/loadTodosFromStorage";
import { filterTodaysTodos } from "../utils/filterTodaysTodo";

export const Todos = (): JSX.Element => {
  const [todos, dispatch] = useReducer(reducer, [], loadTodosFromStorage);

  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(
    () => filterTodaysTodos(filterTodos(todos, selectedStatus)),
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
    const inputText = text.trim();

    if (inputText === "") {
      alert("Empty Todo, Please Add some Task");
      return;
    }

    dispatch({
      type: "UPDATE",
      payload: { id, text: inputText },
    });
  }

  return (
    <div className=" flex-7 flex flex-col gap-3 items-center bg-gray-100 overflow-hidden min-h-0 p-4">
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
