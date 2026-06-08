export type Todo = {
  id: string;
  title: string;
  status: "Incomplete" | "Complete";
  date: string;
};

export type Action =
  | { type: "ADD"; payload: { title: string; id: string } }
  | {
      type: "UPDATE";
      payload: {
        id: string;
        title?: string;
        status?: "Incomplete" | "Complete";
        date?: string;
      };
    }
  | { type: "DELETE"; payload: { id: string } };
