import { z } from "zod";

export const studentSchema = z.object({
  student_name: z
    .string()
    .min(3, { message: "Student name must be at least 3 characters" }),
  student_class: z.string().nonempty({ message: "Class is required" }),
  batch: z.string().min(6, { message: "Batch is Required" }),
  roll_no: z.string().nonempty({ message: "Roll no is required" }),
  note: z.string(),
  subjects: z.array(
    z.object({
      subject_name: z
        .string()
        .nonempty({ message: "Subject Name is required" }),
      marks_got: z
        .number()
        .nonnegative({ message: "What marks student got required" }),
      marks_from: z
        .number()
        .nonnegative({ message: "From what marks is required" }),
    })
  ),
});
