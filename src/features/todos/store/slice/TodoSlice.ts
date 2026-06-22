import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { LocalTodo, NewTodo, Todo } from "../../types/todoTypes";
import { createTodo, editTodo, removeTodo } from "../../utils/todoService";

export type InitialStateType = {
  todos: LocalTodo[];
  loading: boolean;
  error: string | null;
};
const initialState: InitialStateType = {
  todos: [],
  loading: false,
  error: null,
};

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

export const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //add
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        //update local Todo
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      // delete
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((t) => t.uid !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Delete failed";
      })

      // update
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (t) => t.uid === action.payload.uid,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Update failed";
      });
  },
});

export default TodoSlice.reducer;
