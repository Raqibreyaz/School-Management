import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { studentSchema } from "@/schemas/student-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/DatePicker";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FieldTypes = "student_name" | "cohort" | "courses" | "date_joined";

export function AddNewStudent() {
  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {},
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"primary"} className="capitalize">
          <PlusIcon />
          add new student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">Add new student</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="student_name" className="text-right">
              Student Name
            </Label>
            <Input
              id="student_name"
              value="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cohort" className="text-right">
              Cohort
            </Label>
            <Input id="cohort" defaultValue="2024-25" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="courses" className="text-right">
              Courses
            </Label>
            <div className="col-span-3">
              <Input
                id="courses"
                multiple
                defaultValue="class-9 math,class-9 science"
              />
              <div className="text-gray-700 text-sm">
                use ',' for adding multiple
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date_joined" className="text-right">
              Date Joined
            </Label>
            <DatePicker />
          </div>
        </div> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
            {["student_name", "cohort", "courses"].map((fld) => (
              <FormField
                control={form.control}
                name={fld}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {fld.includes("_") ? fld.split("_").join(" ") : fld}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {fld === "courses" ? `use "," for multiple` : ""}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name={"date_joined"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">Data Joined</FormLabel>
                  <FormControl>
                    <DatePicker />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
