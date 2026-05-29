import { memo, useRef } from "react";
import { Button } from "../../../components/Button";
import type { Action } from "../types/todo.types";
type TodoFormProps = {
  dispatch: React.Dispatch<Action>;
};
export const TodoForm = memo(({ dispatch }: TodoFormProps) => {
  const input = useRef<HTMLInputElement>(null);
  function handleAddTodo() {
    const inputText = input.current?.value.trim();
    if (!inputText) {
      alert("Empty Todo, Please Add some Task");
      return;
    }
    dispatch({
      type: "ADD",
      payload: {
        text: inputText,
        id: crypto.randomUUID(),
      },
    });
    if (input.current) input.current.value = "";
  }
  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg flex p-6 justify-between">
      <input
        className="h-full w-full rounded-sm outline-0 pr-1"
        ref={input}
        placeholder="Create a new task"
        required
      />
      <Button
        text="Add"
        onClick={handleAddTodo}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition-colors duration-300"
      ></Button>
    </div>
  );
});
