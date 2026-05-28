import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
import { Button } from "./Button";
import { reducer } from "../utils/reducer";

export type Todo = {
  id: string;
  text: string;
  status: "Incomplete" | "Complete";
  date: string;
  time: string;
};

export type Action =
  | { type: "ADD"; payload: { text: string; id: string } }
  | {
      type: "UPDATE";
      payload: {
        id: string;
        text?: string;
        status?: "Incomplete" | "Complete";
        time?: string;
      };
    }
  | { type: "DELETE"; payload: { id: string } };

export const Todos = (): JSX.Element => {
  const data = localStorage.getItem("todos");
  const initialState = useMemo(() => {
    return data ? JSON.parse(data) : [];
  }, [data]);
  const [todos, dispatch] = useReducer(reducer, initialState);

  const input = useRef<HTMLInputElement>(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //useeffect to cleanup old date todos
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const validTodos = initialState.filter((todo: Todo) => todo.date === today);

    // overwrite localStorage with only valid todos
    localStorage.setItem("todos", JSON.stringify(validTodos));
  }, [initialState]);

  const memoizedFilterArray = useMemo(() => {
    if (selectedStatus == "All") return todos;
    return todos.filter((todo) => todo.status == selectedStatus);
  }, [selectedStatus, todos]);

  function handleAddTodo() {
    if (input.current && input.current.value.trim() !== "") {
      dispatch({
        type: "ADD",
        payload: { text: input.current.value.trim(), id: crypto.randomUUID() },
      });
      input.current.value = "";
    }
  }

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
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg flex p-6 justify-between">
        <input
          className="h-full w-full rounded-sm outline-0 pr-1"
          ref={input}
          placeholder="Create a new task"
          required
        />
        <Button
          text="Add"
          onClick={handleAddTodo}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-colors duration-300"
        ></Button>
      </div>
      <div className=" w-full max-w-lg bg-white shadow-lg rounded-lg p-4 flex flex-col flex-1 overflow-hidden min-h-0">
        {todos.length == 0 ? (
          <h1>No Todo,Please Add </h1>
        ) : (
          <>
            <ul className="flex flex-col gap-1.5 overflow-y-auto flex-1 min-h-0">
              {memoizedFilterArray.map((todo) => {
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
            <div className="pt-3 mt-auto flex gap-2 items-center justify-center text-sm flex-wrap shrink-0">
              <Button text="All" onClick={() => setSelectedStatus("All")} />
              <Button
                text="Completed"
                onClick={() => setSelectedStatus("Complete")}
              />
              <Button
                text="Incomplete"
                onClick={() => setSelectedStatus("Incomplete")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
