import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportCardPDF } from "@/components/ReportCardPDF";
import { studentSchema } from "@/schemas/student-schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export const PDFDownload = ({
  resultState,
}: {
  resultState: z.infer<typeof studentSchema> | null;
}) => {
  return resultState ? (
    <PDFDownloadLink
      document={<ReportCardPDF resultState={resultState} />}
      fileName={`student_result.pdf`}
    >
      <Button
        type="button"
        className=" bg-green-600 text-white hover:bg-green-700 mt-6 py-3"
      >
        Print Result
      </Button>
    </PDFDownloadLink>
  ) : (
    <Button className=" bg-green-600 text-white hover:bg-green-700 mt-6 py-3">
      Generate Result
    </Button>
  );
};
