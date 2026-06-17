import { useRef } from "react";

import { Button } from "../../../components/Button";

import { useTodo } from "../hooks/useTodo";
import { useTheme } from "../context/ThemeContext";

export const TodoForm = () => {
  const input = useRef<HTMLInputElement>(null);

  const { dispatch } = useTodo();

  const { theme } = useTheme();

  function handleAddTodo() {
    const inputText = input.current?.value.trim();
    if (!inputText) {
      alert("Empty Todo, Please Add some Task");
      return;
    }
    dispatch({
      type: "ADD",
      payload: {
        title: inputText,
        id: crypto.randomUUID(),
      },
    });
    if (input.current) input.current.value = "";
  }
  return (
    <div
      className={`w-full max-w-lg shadow-lg rounded-lg flex p-6 justify-between ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}
    >
      <input
        className="h-full w-full rounded-sm outline-0 pr-1 placeholder-gray-400"
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
  );
};
