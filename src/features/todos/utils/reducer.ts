import type { Action, Todo } from "../types/todo.types";

export function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD": {
      const newTodo: Todo = {
        id: action.payload.id,
        text: action.payload.text,
        status: "Incomplete",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
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
              text: action.payload.text ?? todo.text,
              status: action.payload.status ?? todo.status,
              time: new Date().toLocaleTimeString(),
            }
          : todo,
      );
    }
    default:
      return state;
  }
}
