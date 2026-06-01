import { createContext } from "react";
import type { TodoContextType } from "../types/todo.types";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
