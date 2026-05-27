import { useState } from "react";
import ReactDOM from "react-dom";
import type { Todo } from "./Todo";

export const EditModal = ({
  todo,
  onClose,
  onSave,
}: {
  todo: Todo;
  onClose: () => void;
  onSave: (id: string, text: string) => void;
}) => {
  const [editText, setEditText] = useState(todo.text);
  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  return ReactDOM.createPortal(
    // clicking overlay closes modal
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* prevent overlay close when clicking inside */}
      <div
        className="bg-white p-6 rounded shadow-lg relative w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              onSave(todo.id, editText);
              onClose();
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="mt-2 text-gray-600 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
