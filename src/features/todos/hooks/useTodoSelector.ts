import { useSelector } from "react-redux";
import type { TodoStateType } from "../store/TodoStore";

export const useTodoSelector = useSelector.withTypes<TodoStateType>();
