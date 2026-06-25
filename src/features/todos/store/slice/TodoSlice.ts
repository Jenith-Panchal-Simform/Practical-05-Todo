import { createSlice } from "@reduxjs/toolkit";

import { addTodo, deleteTodo, updateTodo } from "./TodoThunk";

import type { LocalTodo } from "../../types/todoTypes";

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
