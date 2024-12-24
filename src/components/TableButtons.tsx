import { AddNewStudent } from "@/features/students/components/add-new-student";
import { IoIosArrowDown as DownIcon } from "react-icons/io";
import { Button } from "./ui/button";

const TableButtons = () => {
  return (
    <div className="px-5 flex justify-between text-sm">
      <div className="flex gap-5">
        {["ay 2024-25", "cbse 9"].map((text) => (
          <Button
            key={text}
            variant={"primary"}
            className="flex items-center uppercase gap-2 border px-3 py-2 rounded-md bg-blue-500/10 text-blue-950 font-semibold"
          >
            {text}
            <span className="">
              <DownIcon />
            </span>
          </Button>
        ))}
      </div>
      <AddNewStudent />
    </div>
  );
};

export default TableButtons;
