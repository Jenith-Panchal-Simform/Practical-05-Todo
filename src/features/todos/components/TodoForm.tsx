import { useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { Button } from "../../../components/Button";

import { useTheme } from "../context/ThemeContext";
import { addTodo, setError, setLoading } from "../slice/TodoSlice";
import { createTodo } from "../utils/todoService";

export const TodoForm = () => {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  async function handleAddTodo() {
    const inputText = input.current?.value.trim();
    if (!inputText) {
      alert("Empty Todo, Please Add some Task");
      return;
    }

    //start Loading
    dispatch(setLoading(true));

    const todoItem = {
      todo: inputText,
      completed: false,
      userId: 1,
    };
    try {
      //call api and if succesfull add to todos

      //api simulation
      const response = await createTodo(todoItem);

      if (response) {
        const localTodo = {
          uid: Math.floor(Math.random() * 1e9),
          ...response,
        };
        dispatch(addTodo(localTodo));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError("Unknown error"));
      }
    } finally {
      dispatch(setLoading(false));
    }

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
