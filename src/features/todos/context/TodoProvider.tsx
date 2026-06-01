import { useReducer, type ReactNode } from "react";
import { reducer } from "../utils/reducer";
import { init } from "../utils/todoInit";
import { TodoContext } from "./TodoContext";

type TodoProviderProps = {
  children: ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, dispatch] = useReducer(reducer, [], init);

  function handleDelete(id: string) {
    dispatch({ type: "DELETE", payload: { id: id } });
  }

  function handleStatusChange(
    id: string,
    currentStatus: "Incomplete" | "Complete",
  ) {
    dispatch({
      type: "UPDATE",
      payload: {
        id,
        status: currentStatus === "Incomplete" ? "Complete" : "Incomplete",
      },
    });
  }

  function handleUpdate(id: string, text: string) {
    if (text && text.trim() !== "")
      dispatch({
        type: "UPDATE",
        payload: { id, text },
      });
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        dispatch,
        handleDelete,
        handleStatusChange,
        handleUpdate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
