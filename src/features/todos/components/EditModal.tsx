import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import type { Todo } from "../types/todo.types";
import { useTheme } from "../context/ThemeContext";

export const EditModal = ({
  todo,
  onClose,
  onSave,
}: {
  todo: Todo;
  onClose: () => void;
  onSave: (id: string, text: string) => void;
}) => {
  const [editText, setEditText] = useState(todo.title);
  const { theme } = useTheme();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();

    const dialog = dialogRef.current;

    const handleClose = () => {
      onClose();
    };

    dialog?.addEventListener("close", handleClose);

    return () => {
      dialog?.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      alert("Empty Todo,Please Add Some Task");
      onClose();
      return;
    }
    onSave(todo.id, trimmedText);
    dialogRef.current?.close();
  };

  return ReactDOM.createPortal(
    <dialog
      ref={dialogRef}
      className="p-0 rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  backdrop:bg-black/30 backdrop:backdrop-blur-sm"
    >
      <div
        className={` p-6 rounded shadow-lg relative w-96 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white"}`}
      >
        <h2 className="text-lg font-bold mb-4">Edit Todo</h2>

        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="border rounded p-2 w-full"
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Save
          </button>

          <button
            onClick={() => dialogRef.current?.close()}
            className="text-red-600 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
};
