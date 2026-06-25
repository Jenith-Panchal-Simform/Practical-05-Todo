import { createAsyncThunk } from "@reduxjs/toolkit";

import type { LocalTodo, NewTodo, Todo } from "../../types/todoTypes";
import { DELETE, POST, PUT } from "../../services/httpMethods";

export const addTodo = createAsyncThunk<LocalTodo, NewTodo>(
  "Todo/addTodoToAPI",
  async (todoItem) => {
    const response: Todo = await POST<Todo>(`/todos/add`, todoItem);
    return { uid: Math.floor(Math.random() * 1e9), ...response };
  },
);

export const deleteTodo = createAsyncThunk<number, number>(
  "Todo/deleteTodoAPI",
  async (uid) => {
    try {
      // pretend to call API
      await DELETE<Todo>(`/todos/${uid}`);
    } catch {
      // ignore error since we only care about local state
    }
    return uid;
  },
);

export const updateTodo = createAsyncThunk<LocalTodo, LocalTodo>(
  "Todo/updateTodoAPI",
  async (todo) => {
    try {
      // will fail for ids > 200
      await PUT<Todo>(`/todos/${todo.id}`, todo);
    } catch {
      // ignore error since we only care about local state
    }
    return todo;
  },
);
