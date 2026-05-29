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
    <div className="flex p-4 justify-between border border-gray-300 rounded-lg w-full overflow-hidden">
      <div className="flex gap-2 text-xl font-semibold items-center flex-1 min-w-0 ">
        <input
          type="checkbox"
          onChange={handleStatusChange}
          id={todo.id}
          checked={todo.status === "Complete"}
          name="task"
          className="appearance-none w-4 h-4 shrink-0 border border-gray-400 rounded-full checked:bg-gray-600 checked:border-gray-700 transition duration-200"
        />
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap min-w-0">
          <label
            htmlFor="task1"
            className={`ml-2 flex-2 ${todo.status === "Complete" ? "line-through text-gray-500" : ""}`}
          >
            {todo.text}
          </label>
          <span
            className={`ml-3 px-2 py-0.5 text-xs font-medium rounded-full ${todo.status === "Complete" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {todo.status}
          </span>
          <span
            className={`ml-3 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-500 text-gray-100`}
          >
            {todo.date}
          </span>
          <span
            className={`ml-3 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-500 text-gray-100`}
          >
            {todo.time}
          </span>
        </div>
      </div>
      <div className="flex gap-1 shrink-0 ml-3">
        <button
          className="text-xl font-semibold cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          ✎
        </button>
        {isEditing && (
          <EditModal
            todo={todo}
            onClose={() => setIsEditing(false)}
            onSave={handleUpdate}
          />
        )}
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
