import { configureStore } from "@reduxjs/toolkit";

import TodoReducer from "../slice/TodoSlice";

export const TodoStore = configureStore({
  reducer: TodoReducer,
});
