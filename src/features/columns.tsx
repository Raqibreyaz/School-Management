import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { FaTrash as TrashIcon } from "react-icons/fa6";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Result = {
  id: string;
  subject_name: string;
  marks_got: number;
  marks_from: 100 | number;
};

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "subject_name",
    header: () => <div className="text-black">Subject Name</div>,
    cell: () => <Input type="text" />,
  },
  {
    accessorKey: "marks_got",
    header: () => <div className="text-black">Marks (Obtained)</div>,
    cell: () => <Input type="number" />,
  },
  {
    accessorKey: "marks_from",
    header: () => <div className="text-black">Marks (Out Of)</div>,
    cell: () => <Input type="number" defaultValue={100} />,
  },
//   {
//     accessorKey: "",
//     cell: () => {
//       return (
//         <div className={`mx-auto size-5`}>
//           <TrashIcon />
//         </div>
//       );
//     },
//   },
];
