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
