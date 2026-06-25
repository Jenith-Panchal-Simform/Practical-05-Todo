export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type NewTodo = Omit<Todo, "id">;

export type LocalTodo = {
  uid: number;
} & Todo;
