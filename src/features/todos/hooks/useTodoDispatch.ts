import { useDispatch } from "react-redux";
import { type TodoDispatchType } from "../store/store";

export const useTodoDispatch = useDispatch.withTypes<TodoDispatchType>();
