import React, { useEffect, useReducer, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
import { Button } from "./Button";
type TodoProps = {
  style?: string;
};
export type Todo = {
  id: string;
  text: string;
  status: "Incomplete" | "Complete";
};

type Action =
  | { type: "ADD"; payload: { text: string; id: string } }
  | { type: "UPDATE"; payload: Todo }
  | { type: "DELETE"; payload: { id: string } };

function reducer(state: Todo[], action: Action): Todo[] {
  console.log(state, action);
  switch (action.type) {
    case "ADD": {
      const newObj: Todo = {
        id: action.payload.id,
        text: action.payload.text,
        status: "Incomplete",
      };
      const newTodo = [...state, newObj];
      return newTodo;
    }
    case "DELETE": {
      return state.filter((todo) => todo.id !== action.payload.id);
    }
    case "UPDATE": {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text ?? todo.text,
              status: action.payload.status ?? todo.status,
            }
          : todo,
      );
    }
    default:
      return state;
  }
}

export const Todo = ({ style }: TodoProps): JSX.Element => {
  const initialState = localStorage.getItem("todos");
  const data = initialState ? JSON.parse(initialState) : [];
  const [todos, dispatch] = useReducer(reducer, data);

  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    console.log(input);
    if (input === "") return;
    dispatch({
      type: "ADD",
      payload: { text: input, id: crypto.randomUUID() },
    });
    setInput("");
  }

  function handleDelete(todo: Todo) {
    dispatch({ type: "DELETE", payload: { id: todo.id } });
  }

  return (
    <div
      className={`${style ?? ""} flex flex-col gap-3 items-center justify-center bg-gray-100`}
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg flex p-6 justify-between">
        <input
          className="h-full  rounded-sm outline-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Create a new task"
        />
        <button
          className="hover:text-gray-500 cursor-pointer"
          onClick={handleAddTodo}
        >
          Add{" "}
        </button>
      </div>
      <div className=" w-full max-w-lg bg-white shadow-lg rounded-lg p-4 flex flex-col">
        <ul className="flex flex-col gap-1.5 overflow-y-auto max-h-[50vh]">
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem todo={todo} handleDelete={() => handleDelete(todo)} />
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2 items-center justify-center text-sm flex-wrap">
          <Button text="All" />
          <Button text="Completed" />
          <Button text="Incomplete" />
        </div>
      </div>
    </div>
  );
};
