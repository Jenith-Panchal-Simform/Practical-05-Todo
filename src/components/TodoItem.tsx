import React, { type JSX } from "react";
import type { Todo } from "./Todo";
type TodoItemProps = {
  todo: Todo;
  handleDelete: () => void;
  handleStatusChange: () => void;
};
const TodoItem = ({
  todo,
  handleDelete,
  handleStatusChange,
}: TodoItemProps): JSX.Element => {
  return (
    <div className="flex p-4 justify-between border border-gray-300 rounded-lg">
      <div className="flex gap-2 text-xl font-semibold items-center">
        <input
          type="checkbox"
          onChange={handleStatusChange}
          id={todo.id}
          name="task"
          className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-gray-600 checked:border-gray-700 transition duration-200"
        />
        <label
          htmlFor="task1"
          className={`ml-2 ${todo.status === "Complete" ? "line-through text-gray-500" : ""}`}
        >
          {todo.text}
        </label>
        <span
          className={`ml-3 px-2 py-0.5 text-xs font-medium rounded-full ${todo.status === "Complete" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {todo.status}
        </span>
      </div>
      <div className="flex gap-1">
        <button className="text-xl font-semibold cursor-pointer">✎</button>
        <button
          className="text-sm font-light cursor-pointer"
          onClick={handleDelete}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
