import { useParams, useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import ResultForm from "../components/ResultForm";
import { Loader2 } from "lucide-react";

const EditResult = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const result = useLiveQuery(() => db.results.get(Number(id)), [id]);

  if (result === undefined) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Result not found</h2>
        <button onClick={() => navigate("/results")} className="text-blue-600 hover:underline dark:text-blue-400">
          Back to Results
        </button>
      </div>
    );
  }

  return <ResultForm initialData={result} />;
};

export default EditResult;
