import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentSchema } from "@/schemas/student-schema";
import { Trash } from "lucide-react";
import { z } from "zod";
import { PDFDownload } from "@/components/PDFDownload";

const defaultValues = {
  student_name: "",
  student_class: "",
  batch: "",
  roll_no: "",
  note: "",
  subjects: [
    { subject_name: "English", marks_got: 0, marks_from: 100 },
    { subject_name: "Science", marks_got: 0, marks_from: 100 },
    { subject_name: "Maths", marks_got: 0, marks_from: 100 },
    { subject_name: "Computer", marks_got: 0, marks_from: 100 },
    { subject_name: "Hindi", marks_got: 0, marks_from: 100 },
  ],
};

const ResultForm: React.FC = () => {
  const [resultState, setResultState] = useState<z.infer<
    typeof studentSchema
  > | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const onSubmit = (data: z.infer<typeof studentSchema>) => {
    console.log("Form Data:", data);
    setResultState(data);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Report Card
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <Label>Name</Label>
            <Input {...register("student_name")} placeholder="Student Name" />
            {errors.student_name && (
              <p className="text-red-500 text-sm">
                {errors.student_name.message}
              </p>
            )}
          </div>
          <div>
            <Label>Class</Label>
            <Input {...register("student_class")} placeholder="Class" />
            {errors.student_class && (
              <p className="text-red-500 text-sm">
                {errors.student_class.message}
              </p>
            )}
          </div>
          <div>
            <Label>Batch</Label>
            <Input {...register("batch")} placeholder="Batch (from-to)" />
            {errors.batch && (
              <p className="text-red-500 text-sm">{errors.batch.message}</p>
            )}
          </div>
          <div>
            <Label>Roll No</Label>
            <Input {...register("roll_no")} placeholder="Roll No" />
            {errors.roll_no && (
              <p className="text-red-500 text-sm">{errors.roll_no.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {fields.map((subject, index) => (
            <div key={subject.id}>
              <div className="flex justify-between flex-wrap">
                <div>
                  <Label>Subject Name</Label>
                  <Input
                    {...register(`subjects.${index}.subject_name`)}
                    placeholder="Subject Name"
                  />
                  {errors.subjects?.[index]?.subject_name && (
                    <p className="text-red-500 text-sm">
                      {errors.subjects[index].subject_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Marks Got</Label>
                  <Input
                    type="number"
                    {...register(`subjects.${index}.marks_got`, {
                      valueAsNumber: true,
                    })}
                    max={100}
                  />
                  {errors.subjects?.[index]?.marks_got && (
                    <p className="text-red-500 text-sm">
                      {errors.subjects[index].marks_got.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Marks From</Label>
                  <Input
                    type="number"
                    {...register(`subjects.${index}.marks_from`, {
                      valueAsNumber: true,
                    })}
                    max={100}
                  />
                  {errors.subjects?.[index]?.marks_from && (
                    <p className="text-red-500 text-sm">
                      {errors.subjects[index].marks_from.message}
                    </p>
                  )}
                </div>
                <div className="mt-auto">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => remove(index)}
                    className="text-red-500"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Label>Note</Label>
          <Input {...register("note")} placeholder="Note.." />
          {errors.note && (
            <p className="text-red-500 text-sm">{errors.note.message}</p>
          )}
        </div>
        <Button
          type="button"
          onClick={() =>
            append({ subject_name: "", marks_got: 0, marks_from: 100 })
          }
          className="mr-4 bg-blue-600 text-white hover:bg-blue-700 mt-6 py-3"
        >
          Add Subject
        </Button>
        <PDFDownload resultState={resultState} />
      </form>
    </div>
  );
};

export default ResultForm;
