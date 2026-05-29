import { useReducer, type ReactNode } from "react";
import { reducer } from "../utils/reducer";
import { init } from "../utils/todoInit";
import { TodoContext } from "./TodoContext";

type TodoProviderProps = {
  children: ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, dispatch] = useReducer(reducer, [], init);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
