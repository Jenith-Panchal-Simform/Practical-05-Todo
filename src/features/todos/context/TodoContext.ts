import { createContext } from "react";
import type { Todo, Action } from "../types/todo.types";

export type TodoContextType = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
