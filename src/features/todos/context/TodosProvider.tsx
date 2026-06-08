import { useEffect, useReducer, type ReactNode } from "react";
import { TodoContext } from "./TodoContext";
import type { Action, Todo } from "../types/todo.types";
import { filterTodaysTodos } from "../utils/filterTodaysTodo";

type TodosProviderProps = {
  children: ReactNode;
};

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD": {
      const newTodo: Todo = {
        id: action.payload.id,
        title: action.payload.title,
        status: "Incomplete",
        date: new Date().toLocaleString(),
      };
      return [...state, newTodo];
    }
    case "DELETE": {
      return state.filter((todo) => todo.id !== action.payload.id);
    }
    case "UPDATE": {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title ?? todo.title,
              status: action.payload.status ?? todo.status,
              date: new Date().toLocaleString(),
            }
          : todo,
      );
    }
    default:
      return state;
  }
}

function loadTodosFromStorage() {
  const data = localStorage.getItem("todos");
  if (!data) return [];

  return filterTodaysTodos(JSON.parse(data));
}

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, dispatch] = useReducer(reducer, [], loadTodosFromStorage);

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
        payload: { id, title: text },
      });
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
