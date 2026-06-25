import { useSelector } from "react-redux";
import type { TodoStateType } from "../store/store";

export const useTodoSelector = useSelector.withTypes<TodoStateType>();
