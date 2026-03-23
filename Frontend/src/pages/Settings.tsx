import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Check, Loader2 } from "lucide-react";
import { useConfigStore } from "../store/useConfigStore";
import { db } from "../db/db";
import { toast } from "sonner";
import { useState } from "react";

const templates = [
  { id: "classic", name: "Classic Bordered", description: "Formal & Traditional", image: "/templates/classic.png" },
  { id: "modern", name: "Modern Minimal", description: "Clean & Elegant", image: "/templates/modern.png" },
  { id: "vibrant", name: "Vibrant Primary", description: "Colorful & Friendly", image: "/templates/vibrant.png" },
  { id: "professional", name: "Professional", description: "Data Focus", image: "/templates/professional.png" },
  { id: "sidebar", name: "Elegant Sidebar", description: "Modern Layout", image: "/templates/sidebar.png" },
];

const Settings = () => {
  const navigate = useNavigate();
  const { config, setConfig } = useConfigStore();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleTemplateSelect = async (templateId: string) => {
    if (!config || config.templateId === templateId) return;

    try {
      setIsUpdating(templateId);
      const updatedConfig = { ...config, templateId };
      await db.config.put(updatedConfig);
      setConfig(updatedConfig);
      toast.success(`Template switched to ${templateId}`);
    } catch (error) {
      toast.error("Failed to update template");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Settings</h2>
      </div>
      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <SettingsIcon size={20} className="text-gray-500 dark:text-gray-400" /> School Configuration
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">Update your school name, address, logo, and branding colors.</p>
          </div>
          <Button onClick={() => navigate("/setup")} variant="outline" className="w-full sm:w-auto border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800">
            Edit Full Configuration
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Quick Template Selection</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">Choose a different report card design instantly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {templates.map((t) => (
            <div 
              key={t.id}
              onClick={() => handleTemplateSelect(t.id)}
              className={`relative cursor-pointer group rounded-xl border-2 transition-all overflow-hidden ${
                config?.templateId === t.id 
                  ? "border-blue-600 ring-4 ring-blue-600/10 shadow-lg" 
                  : "border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800"
              }`}
            >
              <div className="aspect-3/4 overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    config?.templateId === t.id ? "scale-105" : "group-hover:scale-105"
                  }`}
                />
                {isUpdating === t.id && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
                    <Loader2 size={24} className="animate-spin text-blue-600" />
                  </div>
                )}
              </div>
              
              {config?.templateId === t.id && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-md z-10">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}

              <div className="p-3 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
                <h4 className="font-semibold text-xs text-gray-800 dark:text-gray-100">{t.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
