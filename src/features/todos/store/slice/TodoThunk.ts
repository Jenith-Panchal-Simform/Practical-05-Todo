import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTodo, editTodo, removeTodo } from "../../utils/todoService";
import type { LocalTodo, NewTodo, Todo } from "../../types/todoTypes";

export const addTodo = createAsyncThunk<LocalTodo, NewTodo>(
  "Todo/addTodoToAPI",
  async (todoItem) => {
    const response: Todo = await createTodo(todoItem);
    return { uid: Math.floor(Math.random() * 1e9), ...response };
  },
);

export const deleteTodo = createAsyncThunk<number, number>(
  "Todo/deleteTodoAPI",
  async (uid) => {
    // pretend to call API
    await removeTodo(1);

    return uid;
  },
);

export const updateTodo = createAsyncThunk<LocalTodo, LocalTodo>(
  "Todo/updateTodoAPI",
  async (todo) => {
    try {
      // will fail for ids > 200
      await editTodo(todo);
    } catch {
      // ignore error since we only care about local state
    }
    return todo;
  },
);
