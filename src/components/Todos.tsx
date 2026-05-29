import { useEffect, useMemo, useReducer, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
import { Button } from "./Button";
import { reducer } from "../utils/reducer";
import { TodoForm } from "./TodoForm";

export type Todo = {
    id: string;
    text: string;
    status: "Incomplete" | "Complete";
    date: string;
    time: string;
};

export type Action =
    | { type: "ADD"; payload: { text: string; id: string } }
    | {
          type: "UPDATE";
          payload: {
              id: string;
              text?: string;
              status?: "Incomplete" | "Complete";
              time?: string;
          };
      }
    | { type: "DELETE"; payload: { id: string } };
function init() {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
}
export const Todos = (): JSX.Element => {
    const [todos, dispatch] = useReducer(reducer, [], init);

    const [selectedStatus, setSelectedStatus] = useState("All");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    //useeffect to cleanup old date todos
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        const validTodos = todos.filter((todo: Todo) => todo.date === today);

        // overwrite localStorage with only valid todos
        localStorage.setItem("todos", JSON.stringify(validTodos));
    }, [todos]);

    const memoizedFilterArray = useMemo(() => {
        if (selectedStatus == "All") return todos;
        return todos.filter((todo) => todo.status == selectedStatus);
    }, [selectedStatus, todos]);

    

    function handleDelete(id: string) {
        dispatch({ type: "DELETE", payload: { id: id } });
    }

    function handleStatusChange(
        id: string,
        currentStatus: "Incomplete" | "Complete",
    ) {
        dispatch({
            type: "UPDATE",
            payload: {
                id,
                status:
                    currentStatus === "Incomplete" ? "Complete" : "Incomplete",
            },
        });
    }

    function handleUpdate(id: string, text: string) {
        if (text && text.trim() !== "")
            dispatch({
                type: "UPDATE",
                payload: { id, text },
            });
    }

    return (
        <div className=" flex-[7] flex flex-col gap-3 items-center bg-gray-100 overflow-hidden min-h-0 p-4">
            <TodoForm dispatch={dispatch}/>
            <div className=" w-full max-w-lg bg-white shadow-lg rounded-lg p-4 flex flex-col flex-1 overflow-hidden min-h-0">
                {todos.length == 0 ? (
                    <h1>No Todo,Please Add </h1>
                ) : (
                    <>
                        <ul className="flex flex-col gap-1.5 overflow-y-auto flex-1 min-h-0">
                            {memoizedFilterArray.map((todo) => {
                                const today = new Date().toLocaleDateString();
                                return (
                                    todo.date === today && (
                                        <li key={todo.id}>
                                            <TodoItem
                                                todo={todo}
                                                handleDelete={() =>
                                                    handleDelete(todo.id)
                                                }
                                                handleStatusChange={() =>
                                                    handleStatusChange(
                                                        todo.id,
                                                        todo.status,
                                                    )
                                                }
                                                handleUpdate={handleUpdate}
                                            />
                                        </li>
                                    )
                                );
                            })}
                        </ul>
                        <div className="pt-3 mt-auto flex gap-2 items-center justify-center text-sm flex-wrap shrink-0">
                            <Button
                                text="All"
                                onClick={() => setSelectedStatus("All")}
                            />
                            <Button
                                text="Completed"
                                onClick={() => setSelectedStatus("Complete")}
                            />
                            <Button
                                text="Incomplete"
                                onClick={() => setSelectedStatus("Incomplete")}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
