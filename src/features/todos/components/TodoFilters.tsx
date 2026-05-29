import React from "react";
import { Button } from "../../../components/Button";
type TodoFiltersProps = {
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
};
export const TodoFilters = ({ setSelectedStatus }: TodoFiltersProps) => {
  return (
    <div className="pt-3 mt-auto flex gap-2 items-center justify-center text-sm flex-wrap shrink-0">
      <Button text="All" onClick={() => setSelectedStatus("All")} />
      <Button text="Completed" onClick={() => setSelectedStatus("Complete")} />
      <Button
        text="Incomplete"
        onClick={() => setSelectedStatus("Incomplete")}
      />
    </div>
  );
};
