import { useDispatch } from "react-redux";
import { type TodoDispatchType } from "../store/TodoStore";

export const useTodoDispatch = useDispatch.withTypes<TodoDispatchType>();
