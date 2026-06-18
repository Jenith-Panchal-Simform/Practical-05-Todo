import { httpMethods } from "../services/httpMethods";
import type { Todo } from "../types/todo.types";

export const getProducts = () => {
  return httpMethods.get<Todo[]>("/todos");
};

export const getProduct = (id: string) => {
  return httpMethods.get<Todo>(`/todos/${id}`);
};

export const addTodo = (data: Todo) => {
  return httpMethods.put(`/todos/${data.id}`, data);
};

export const deleteTodo = (id: string) => {
  return httpMethods.delete(`/todos/${id}`);
};

export const updateTodo = (data: Todo) => {
  return httpMethods.put(`/todos/${data.id}`, data);
};
