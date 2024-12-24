import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  student_name: string;
  cohort: string;
  courses: string[];
  date_joined: string;
  last_login: string;
  status: "online" | "offline";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "student_name",
    header: () => <div className="text-black">Student Name</div>,
  },
  {
    accessorKey: "cohort",
    header: () => <div className="text-black">Cohort</div>,
  },
  {
    accessorKey: "courses",
    header: () => <div className="text-black">Courses</div>,
  },
  {
    accessorKey: "date_joined",
    header: () => <div className="text-black">Date Joined</div>,
  },
  {
    accessorKey: "last_login",
    header: () => <div className="text-black">Last Login</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-black">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className={`mx-auto rounded-full size-3 ${status === "offline" ?"bg-red-500":"bg-green-400"}`}></div>
      );
    },
  },
];
