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
import { db } from "../db/db";
import { toast } from "sonner";
import { useConfigStore } from "../store/useConfigStore";

const defaultValues = {
  student_name: "Raquib",
  student_class: "12",
  batch: "2023-24",
  roll_no: "1024",
  note: "Excellent Performance, Keep it up!",
  subjects: [
    { subject_name: "English", marks_got: 92, marks_from: 100 },
    { subject_name: "Science", marks_got: 94, marks_from: 100 },
    { subject_name: "Maths", marks_got: 99, marks_from: 100 },
    { subject_name: "Computer", marks_got: 95, marks_from: 100 },
    { subject_name: "Hindi", marks_got: 97, marks_from: 100 },
  ],
};

interface ResultFormProps {
  initialData?: any;
}

const ResultForm: React.FC<ResultFormProps> = ({ initialData }) => {
  const config = useConfigStore((state) => state.config);
  const [resultState, setResultState] = useState<z.infer<
    typeof studentSchema
  > | null>(initialData || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData || defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const onSubmit = async (data: z.infer<typeof studentSchema>) => {
    try {
      setIsSubmitting(true);
      const resultToSave = {
        ...data,
        createdAt: initialData?.createdAt || new Date().toISOString(),
      };

      if (initialData?.id) {
        await db.results.put({ ...resultToSave, id: initialData.id });
        setResultState({ ...data, id: initialData.id } as any);
        toast.success("Result updated successfully!");
      } else {
        await db.results.add(resultToSave);
        setResultState(data);
        toast.success("Result generated and saved!");
      }

      // We don't reset immediately so the PDF download button appears with the data.
      // Reset could be triggered by a "Start New" button afterwards.
    } catch (error) {
      console.error(error);
      toast.error("Failed to save result");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      reset(defaultValues);
      setResultState(null);
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b dark:border-gray-800 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {initialData ? "Edit Report Card" : "Create Report Card"}
        </h2>
        {isDirty && (
          <Button
            type="button"
            variant={"outline"}
            onClick={handleReset}
            className="text-gray-500 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Clear Form
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <Label>Student Name</Label>
            <Input {...register("student_name")} placeholder="John Doe" />
            {errors.student_name && (
              <p className="text-red-500 text-sm">
                {errors.student_name.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Class</Label>
            <Input {...register("student_class")} placeholder="e.g. Class 10" />
            {errors.student_class && (
              <p className="text-red-500 text-sm">
                {errors.student_class.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Section / Batch</Label>
            <Input {...register("batch")} placeholder="e.g. Section A" />
            {errors.batch && (
              <p className="text-red-500 text-sm">
                {errors.batch.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Roll No</Label>
            <Input {...register("roll_no")} placeholder="e.g. 1042" />
            {errors.roll_no && (
              <p className="text-red-500 text-sm">
                {errors.roll_no.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <div className="flex justify-between items-end border-b dark:border-gray-800 pb-2">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Subjects & Marks
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({ subject_name: "", marks_got: 0, marks_from: 100 })
              }
              className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              + Add Subject
            </Button>
          </div>

          {fields.map((subject, index) => (
            <div
              key={subject.id}
              className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-100 dark:border-gray-800 flex items-start gap-4"
            >
              <div className="flex-1 space-y-2">
                <Label>Subject Name</Label>
                <Input
                  {...register(`subjects.${index}.subject_name`)}
                  placeholder="e.g. Mathematics"
                />
                {(errors.subjects as any)?.[index]?.subject_name && (
                  <p className="text-red-500 text-sm">
                    {
                      (errors.subjects as any)[index].subject_name
                        .message as string
                    }
                  </p>
                )}
              </div>
              <div className="w-24 space-y-2">
                <Label>Marks Got</Label>
                <Input
                  type="number"
                  {...register(`subjects.${index}.marks_got`, {
                    valueAsNumber: true,
                  })}
                  min={0}
                />
                {(errors.subjects as any)?.[index]?.marks_got && (
                  <p className="text-red-500 text-sm">
                    {
                      (errors.subjects as any)[index].marks_got
                        .message as string
                    }
                  </p>
                )}
              </div>
              <div className="w-24 space-y-2">
                <Label>Out Of</Label>
                <Input
                  type="number"
                  {...register(`subjects.${index}.marks_from`, {
                    valueAsNumber: true,
                  })}
                  min={1}
                />
                {(errors.subjects as any)?.[index]?.marks_from && (
                  <p className="text-red-500 text-sm">
                    {
                      (errors.subjects as any)[index].marks_from
                        .message as string
                    }
                  </p>
                )}
              </div>
              <div className="pt-8">
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => remove(index)}
                  className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 px-3"
                >
                  <Trash size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          <Label>Teacher's Remarks / Note</Label>
          <Input {...register("note")} placeholder="Excellent performance..." />
          {errors.note && (
            <p className="text-red-500 text-sm">
              {errors.note.message as string}
            </p>
          )}
        </div>

        <div className="flex sm:flex-nowrap flex-wrap items-center gap-4 mt-8 pt-6 border-t dark:border-gray-800">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white hover:bg-blue-700 py-6 px-8 text-lg flex-1"
          >
            {isSubmitting
              ? "Saving..."
              : initialData
                ? "Update Result"
                : "Generate Result & Save"}
          </Button>

          {resultState && (
            <>
              {!initialData && (
                <Button
                  type="button"
                  onClick={() => {
                    reset(defaultValues);
                    setResultState(null);
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 py-6 px-8 text-lg"
                >
                  Start New Result
                </Button>
              )}
              <div className="flex-1 flex" onClick={(e) => e.stopPropagation()}>
                <PDFDownload resultState={resultState} config={config} />
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResultForm;
