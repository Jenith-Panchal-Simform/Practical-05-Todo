import type { Action, Todo } from "../components/Todo";

export function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD": {
      const newObj: Todo = {
        id: action.payload.id,
        text: action.payload.text,
        status: "Incomplete",
      };
      const newTodo = [...state, newObj];
      return newTodo;
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
            }
          : todo,
      );
    }
    default:
      return state;
  }
}
