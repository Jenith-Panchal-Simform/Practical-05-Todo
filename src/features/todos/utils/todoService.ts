import { httpMethods } from "../services/httpMethods";
import type { NewTodo, Todo } from "../types/todo.types";

export const fetchTodos = () => {
  return httpMethods.get<Todo[]>("/todos");
};

export const fetchTodoById = (id: number) => {
  return httpMethods.get<Todo>(`/todos/${id}`);
};

export const createTodo = (data: NewTodo) => {
  return httpMethods.post(`/todos/add`, data);
};

export const removeTodo = (id: number) => {
  return httpMethods.delete(`/todos/${id}`);
};

export const editTodo = (data: Todo) => {
  return httpMethods.put(`/todos/${data.id}`, data);
};
