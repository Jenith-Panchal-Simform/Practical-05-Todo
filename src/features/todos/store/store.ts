import { configureStore } from "@reduxjs/toolkit";

import TodoReducer from "./slice/TodoSlice";

export const store = configureStore({
  reducer: TodoReducer,
});

export type StoreType = typeof store;
export type TodoStateType = ReturnType<StoreType["getState"]>;
export type TodoDispatchType = StoreType["dispatch"];
