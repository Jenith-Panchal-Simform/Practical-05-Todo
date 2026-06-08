import { createContext } from "react";
import type { Action, Todo } from "../types/todo.types";

export type TodoContextType = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
  handleDelete: (id: string) => void;
  handleStatusChange: (
    id: string,
    currentStatus: "Incomplete" | "Complete",
  ) => void;
  handleUpdate: (id: string, text: string) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
