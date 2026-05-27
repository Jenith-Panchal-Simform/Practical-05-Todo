import React from "react";
import type { JSX } from "react/jsx-runtime";
import TodoItem from "./TodoItem";
import { Button } from "./Button";
type TodoProps = {
  style?: string;
};
export const Todo = ({ style }: TodoProps): JSX.Element => {
  return (
    <div
      className={`${style ?? ""} flex flex-col gap-3 items-center justify-center bg-gray-100`}
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
        <input
          className="h-full w-full rounded-sm p-6 outline-0"
          value=""
          placeholder="Create a new task"
        />
      </div>
      <div className=" w-full max-w-lg bg-white shadow-lg rounded-lg p-4 flex flex-col">
        <ul className="flex flex-col gap-1.5 overflow-y-auto max-h-[50vh]">
          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>

          <li>
            <TodoItem />
          </li>
          <li>
            <TodoItem />
          </li>
        </ul>
        <div className="mt-3 flex gap-2 items-center justify-center text-sm flex-wrap">
          <Button text="All" />
          <Button text="Completed" />
          <Button text="Incomplete" />
        </div>
      </div>
    </div>
  );
};
