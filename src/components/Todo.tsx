import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
import { Button } from "./Button";
import { reducer } from "../utils/reducer";
type TodoProps = {
  style?: string;
};
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
        id?: string;
        text?: string;
        status?: "Incomplete" | "Complete";
        date?: string;
        time?: string;
      };
    }
  | { type: "DELETE"; payload: { id: string } };

export const Todo = ({ style }: TodoProps): JSX.Element => {
  const initialState = localStorage.getItem("todos");
  const data = useMemo(() => {
    return initialState ? JSON.parse(initialState) : [];
  }, [initialState]);
  const [todos, dispatch] = useReducer(reducer, data);

  const input = useRef<HTMLInputElement>(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //useeffect to cleanup old date todos
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const validTodos = data.filter((todo: Todo) => todo.date === today);

    // overwrite localStorage with only valid todos
    localStorage.setItem("todos", JSON.stringify(validTodos));
  }, [data]);

  const memoizedFilterArray = useMemo(() => {
    if (selectedStatus == "All") return todos;
    return todos.filter((todo) => todo.status == selectedStatus);
  }, [selectedStatus, todos]);

  function handleAddTodo() {
    if (input.current && input.current.value !== "") {
      dispatch({
        type: "ADD",
        payload: { text: input.current.value, id: crypto.randomUUID() },
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
    if (text)
      dispatch({
        type: "UPDATE",
        payload: { id, text },
      });
  }

  return (
    <div
      className={`${style ?? ""} flex flex-col gap-3 items-center bg-gray-100 overflow-hidden min-h-0 p-4`}
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg flex p-6 justify-between">
        <input
          className="h-full w-full rounded-sm outline-0 pr-1"
          ref={input}
          placeholder="Create a new task"
          required
        />
        <button
          className="hover:text-gray-500 cursor-pointer"
          onClick={handleAddTodo}
        >
          Add{" "}
        </button>
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
              <Button text="All" click={() => setSelectedStatus("All")} />
              <Button
                text="Completed"
                click={() => setSelectedStatus("Complete")}
              />
              <Button
                text="Incomplete"
                click={() => setSelectedStatus("Incomplete")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
