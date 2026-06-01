export type Todo = {
  id: string;
  text: string;
  status: "Incomplete" | "Complete";
  date: string;
  time: string;
};

export type Action =
  | { type: "ADD"; payload: { text: string; id: string } }
  | {
      type: "UPDATE";
      payload: {
        id: string;
        text?: string;
        status?: "Incomplete" | "Complete";
        time?: string;
      };
    }
  | { type: "DELETE"; payload: { id: string } };

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
