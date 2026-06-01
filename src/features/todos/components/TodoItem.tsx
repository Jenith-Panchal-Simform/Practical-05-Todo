import { useState, type JSX } from "react";
import { EditModal } from "./EditModal";
import type { Todo } from "../types/todo.types";

type TodoItemProps = {
  todo: Todo;
  handleDelete: () => void;
  handleStatusChange: () => void;
  handleUpdate: (id: string, text: string) => void;
};
const TodoItem = ({
  todo,
  handleDelete,
  handleStatusChange,
  handleUpdate,
}: TodoItemProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex flex-col gap-3 p-4 border border-gray-300 rounded-lg w-full overflow-hidden">
      {/* top section */}
      <div className="flex gap-2 text-xl font-semibold items-start">
        <input
          type="checkbox"
          onChange={handleStatusChange}
          id={todo.id}
          checked={todo.status === "Complete"}
          name="task"
          className="mt-1 appearance-none w-4 h-4 shrink-0 border border-gray-400 rounded-full checked:bg-gray-600 checked:border-gray-700 transition duration-200"
        />
        <div className="flex-1 min-w-0">
          <label
            htmlFor="task1"
            className={`text-lg wrap-break-word ${todo.status === "Complete" ? "line-through text-gray-500" : ""}`}
          >
            {todo.text}
          </label>
        </div>
      </div>

      {/* bottom section */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap overflow-hidden">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap shrink-0 ${todo.status === "Complete" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {todo.status}
          </span>
          <span
            className={` px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap shrink-0 bg-gray-500 text-gray-100`}
          >
            {todo.date}
          </span>
          <span
            className={` px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap shrink-0 bg-gray-500 text-gray-100`}
          >
            {todo.time}
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
            onClick={handleDelete}
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
