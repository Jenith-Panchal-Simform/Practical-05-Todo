import { configureStore } from "@reduxjs/toolkit";

import TodoReducer from "../slice/TodoSlice";

export const TodoStore = configureStore({
  reducer: TodoReducer,
});

export type TodoStoreType = typeof TodoStore;
export type TodoStateType = ReturnType<TodoStoreType["getState"]>;
export type TodoDispatchType = TodoStoreType["dispatch"];
