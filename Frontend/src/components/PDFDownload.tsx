import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportCardPDF } from "@/components/ReportCardPDF";
import { studentSchema } from "@/schemas/student-schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SchoolConfig } from "@/db/db";

export const PDFDownload = ({
  resultState,
  config,
}: {
  resultState: z.infer<typeof studentSchema> | null;
  config: SchoolConfig | null;
}) => {
  return resultState ? (
    <PDFDownloadLink
      document={<ReportCardPDF resultState={resultState} config={config} />}
      fileName={`${resultState.student_name}_result.pdf`}
    >
      <Button
        type="button"
        className=" bg-green-600 text-white hover:bg-green-700 mt-6 py-3"
      >
        Download PDF
      </Button>
    </PDFDownloadLink>
  ) : (
    <Button
      disabled
      className=" bg-green-600/50 text-white mt-6 py-3 cursor-not-allowed"
    >
      Submit to Generate PDF
    </Button>
  );
};
