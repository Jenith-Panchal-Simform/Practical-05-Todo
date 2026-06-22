import { DELETE, GET, POST, PUT } from "../services/httpMethods";
import type { NewTodo, Todo } from "../types/todoTypes";

export const fetchTodos = () => {
  return GET<Todo[]>("/todos");
};

export const fetchTodoById = (id: number) => {
  return GET<Todo>(`/todos/${id}`);
};

export const createTodo = (data: NewTodo) => {
  return POST<Todo>(`/todos/add`, data);
};

export const removeTodo = (id: number) => {
  return DELETE<Todo>(`/todos/${id}`);
};

export const editTodo = (data: Todo): Promise<Todo> => {
  return PUT<Todo>(`/todos/${data.id}`, data);
};
