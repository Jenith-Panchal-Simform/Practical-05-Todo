import React, { type JSX } from "react";

const TodoItem = (): JSX.Element => {
  return (
    <div className="flex p-4 justify-between border border-gray-300 rounded-lg">
      <div className="flex gap-2 text-xl font-semibold items-center">
        <input
          type="checkbox"
          id="task1"
          name="task"
          className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-gray-600 checked:border-gray-700 transition duration-200"
        />
        <label htmlFor="task1">Task1</label>
      </div>
      <button className="text-xl font-semibold">✎</button>
    </div>
  );
};

export default TodoItem;
