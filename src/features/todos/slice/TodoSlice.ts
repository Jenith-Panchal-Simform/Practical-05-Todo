import { createSlice } from "@reduxjs/toolkit";

import type { Todo } from "../types/todo.types";

type InitialStateType = {
  todos: Todo[];
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
  reducers: {
    setTodo: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index != -1) {
        state.todos[index] = action.payload;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});
export const {
  setTodo,
  updateTodo,
  deleteTodo,
  addTodo,
  setError,
  setLoading,
} = TodoSlice.actions;

export default TodoSlice.reducer;
