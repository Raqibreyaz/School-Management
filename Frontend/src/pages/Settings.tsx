import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Settings</h2>
      
      <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <SettingsIcon size={20} className="text-gray-500 dark:text-gray-400" /> School Configuration
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">Update your school name, address, logo, and branding colors. This will affect all generated PDFs.</p>
        </div>
        <Button onClick={() => navigate("/setup")} variant="outline" className="border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800">
          Edit Configuration
        </Button>
      </div>
    </div>
  );
};

export default Settings;
