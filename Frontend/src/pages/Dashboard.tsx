import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { useConfigStore } from "../store/useConfigStore";
import { Link } from "react-router-dom";
import { FilePlus, FileText, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const config = useConfigStore((state) => state.config);
  const totalResults = useLiveQuery(() => db.results.count()) || 0;
  const recentResults = useLiveQuery(() => db.results.orderBy('createdAt').reverse().limit(5).toArray()) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here is the overview for {config?.schoolName}.</p>
        </div>
        <Link to="/results/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
          <FilePlus size={18} />
          Create New Result
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-full flex-shrink-0">
            <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Online</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full flex-shrink-0">
            <FileText className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Results Generated</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{totalResults}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Recently Added Results</h3>
        </div>
        <div className="p-0">
          {recentResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800/80">
                  <tr>
                    <th className="px-6 py-3">Student Name</th>
                    <th className="px-6 py-3">Class & Section</th>
                    <th className="px-6 py-3">Roll No</th>
                    <th className="px-6 py-3">Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  {recentResults.map((result) => (
                    <tr key={result.id} className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{result.student_name}</td>
                      <td className="px-6 py-4">{result.student_class}</td>
                      <td className="px-6 py-4">{result.roll_no}</td>
                      <td className="px-6 py-4">{new Date(result.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No results have been generated yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
