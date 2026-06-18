import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, type JSX } from "react";

import type { LocalTodo } from "../types/todo.types";
import { useTheme } from "../context/ThemeContext";
import {
  deleteTodo,
  setError,
  setLoading,
  updateTodo,
} from "../slice/TodoSlice";
import { removeTodo } from "../utils/todoService";

import { EditModal } from "./EditModal";

type TodoItemProps = {
  todo: LocalTodo;
};
const TodoItem = ({ todo }: TodoItemProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  async function handleDelete(uid: number) {
    //set loading to true
    dispatch(setLoading(true));
    try {
      //api simulation
      const res = await removeTodo(1);
      if (res) {
        //local todo state update
        dispatch(deleteTodo(uid));
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
  }

  async function handleUpdate(todo: LocalTodo, isStatusUpdated: boolean) {
    dispatch(setLoading(true));
    try {
      if (isStatusUpdated) {
        const editedTodo = todo.completed
          ? { ...todo, completed: false }
          : { ...todo, completed: true };
        dispatch(updateTodo(editedTodo));
      } else {
        dispatch(updateTodo(todo));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setError(err.message)); // or err.response?.data
      } else {
        dispatch(setError("Unknown error"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div
      className={`flex flex-col gap-3 p-4 border  rounded-lg w-full overflow-hidden ${theme === "dark" ? "border-white" : "border-gray-300"}`}
    >
      {/* top section */}
      <div className="flex gap-2 text-xl font-semibold items-start">
        <input
          type="checkbox"
          onChange={() => handleUpdate(todo, true)}
          id={todo.id.toString()}
          checked={todo.completed === true}
          name="task"
          className={`mt-1 appearance-none w-4 h-4 shrink-0 border  rounded-full  transition duration-200 ${theme === "dark" ? "border-white checked:bg-green-600 checked:border-green-700" : "border-gray-400 checked:bg-gray-600 checked:border-gray-700"}`}
        />
        <div className="flex-1 min-w-0">
          <label
            htmlFor="task1"
            className={`text-lg wrap-break-word ${todo.completed === true ? (theme === "dark" ? "line-through text-gray-300" : "line-through text-gray-500") : ""}`}
          >
            {todo.todo}
          </label>
        </div>
      </div>

      {/* bottom section */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap overflow-hidden">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap shrink-0 ${todo.completed === true ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {todo.completed ? "Completed" : "Incomplete"}
          </span>
        </div>
        <div className="flex gap-2 shrink-0 ml-3">
          <button
            className="w-8 h-8 flex items-center justify-center text-xl font-semibold cursor-pointer "
            onClick={() => setIsEditing(true)}
          >
            ✎
          </button>

          <button
            className=" w-8 h-8 flex items-center justify-centertext-sm font-light cursor-pointer"
            onClick={() => handleDelete(todo.uid)}
          >
            ✖
          </button>
        </div>
      </div>
      {isEditing && (
        <EditModal
          todo={todo}
          onClose={() => setIsEditing(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default TodoItem;
