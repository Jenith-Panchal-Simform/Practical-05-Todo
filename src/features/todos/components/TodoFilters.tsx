import React from "react";
import { Button } from "../../../components/Button";
type TodoFiltersProps = {
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
};
export const TodoFilters = ({
  selectedStatus,
  setSelectedStatus,
}: TodoFiltersProps) => {
  return (
    <div className="pt-3 mt-auto flex gap-2 items-center justify-center text-sm flex-wrap shrink-0">
      <Button
        text="All"
        onClick={() => setSelectedStatus("All")}
        className={selectedStatus == "All" ? "bg-gray-500 text-white " : ""}
      />
      <Button
        text="Completed"
        onClick={() => setSelectedStatus("Complete")}
        className={
          selectedStatus == "Complete" ? "bg-gray-500 text-white " : ""
        }
      />
      <Button
        text="Incomplete"
        onClick={() => setSelectedStatus("Incomplete")}
        className={
          selectedStatus == "Incomplete" ? "bg-gray-500 text-white   " : ""
        }
      />
    </div>
  );
};
