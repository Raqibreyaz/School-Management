import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilePlus, Edit, Trash2, Printer, FileText, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { ReportCardPDF } from "../components/ReportCardPDF";
import { useConfigStore } from "../store/useConfigStore";
import { useState } from "react";

const DownloadPDFButton = ({ result, config }: { result: any, config: any }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const blob = await pdf(<ReportCardPDF resultState={result} config={config} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${result.student_name}_result.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={handleDownload}
      disabled={isGenerating}
      title="Download PDF"
      className="h-8 w-8 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
    >
      {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Printer size={16} />}
    </Button>
  );
};

const ResultsList = () => {
  const config = useConfigStore((state) => state.config);
  const results = useLiveQuery(() => db.results.orderBy('createdAt').reverse().toArray()) || [];

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this result?")) {
      await db.results.delete(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">All Results</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and print student report cards.</p>
        </div>
        <Link to="/results/create">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
            <FilePlus size={18} /> Add Result
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/80">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Roll No</th>
                  <th className="px-6 py-4">Date Added</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{result.student_name}</td>
                    <td className="px-6 py-4">{result.student_class} ({result.batch})</td>
                    <td className="px-6 py-4">{result.roll_no}</td>
                    <td className="px-6 py-4">{new Date(result.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <DownloadPDFButton result={result} config={config} />
                        <Link to={`/results/edit/${result.id}`}>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <Edit size={16} />
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDelete(result.id)}
                          className="h-8 w-8 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center flex flex-col items-center justify-center">
            <FileText size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No results found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't generated any report cards yet.</p>
            <Link to="/results/create">
              <Button>Create your first result</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsList;
