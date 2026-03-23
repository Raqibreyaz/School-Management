import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { configSchema } from "../schemas/config-schema";
import { db } from "../db/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConfigStore } from "../store/useConfigStore";

import { Check } from "lucide-react";

type ConfigFormValues = z.infer<typeof configSchema>;

const templates = [
  { id: "classic", name: "Classic Bordered", description: "Formal & Traditional", image: "/templates/classic.png" },
  { id: "modern", name: "Modern Minimal", description: "Clean & Elegant", image: "/templates/modern.png" },
  { id: "vibrant", name: "Vibrant Primary", description: "Colorful & Friendly", image: "/templates/vibrant.png" },
  { id: "professional", name: "Professional", description: "Data Focus", image: "/templates/professional.png" },
  { id: "sidebar", name: "Elegant Sidebar", description: "Modern Layout", image: "/templates/sidebar.png" },
];

const SetupWizard = () => {
  const navigate = useNavigate();
  const setConfig = useConfigStore((state) => state.setConfig);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = useConfigStore((state) => state.config);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConfigFormValues>({
    resolver: zodResolver(configSchema),
    defaultValues: config ? {
      schoolName: config.schoolName,
      schoolAddress: config.schoolAddress,
      contactInfo: config.contactInfo,
      themeColor: config.themeColor,
      templateId: config.templateId as any,
    } : {
      schoolName: "",
      schoolAddress: "",
      contactInfo: "",
      themeColor: "#1E3A8A",
      templateId: "classic",
    },
  });

  const selectedTemplate = watch("templateId");

  useEffect(() => {
    if (config) {
      reset({
        schoolName: config.schoolName,
        schoolAddress: config.schoolAddress,
        contactInfo: config.contactInfo,
        themeColor: config.themeColor,
        templateId: config.templateId as any,
      });
      if (config.logoUrl) {
        setLogoUrl(config.logoUrl);
      }
    }
  }, [config, reset]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ConfigFormValues) => {
    try {
      setIsSubmitting(true);
      const newConfig = {
        id: 1, // Always 1
        schoolName: data.schoolName,
        schoolAddress: data.schoolAddress,
        contactInfo: data.contactInfo || "",
        logoUrl: logoUrl,
        themeColor: data.themeColor,
        templateId: data.templateId,
        isSetupComplete: true,
      };

      await db.config.put(newConfig);
      setConfig(newConfig);
      toast.success("School configuration saved successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Setup error:", error);
      toast.error("Failed to save configuration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 md:p-10">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 p-6 md:p-10 rounded-2xl shadow-xl border dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-2">School Setup</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Welcome to Result Maker. Customize your app to match your school's branding.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>School Name *</Label>
              <Input {...register("schoolName")} placeholder="e.g. Western High School" />
              {errors.schoolName && <p className="text-red-500 text-sm">{errors.schoolName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Brand Color</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="color" 
                  {...register("themeColor")} 
                  value={watch("themeColor")}
                  className="w-14 h-10 p-1 cursor-pointer" 
                />
                <Input 
                  type="text" 
                  {...register("themeColor")} 
                  value={watch("themeColor")}
                  className="flex-1" 
                  placeholder="#1E3A8A" 
                />
              </div>
              {errors.themeColor && <p className="text-red-500 text-sm">{errors.themeColor.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>School Address *</Label>
            <Input {...register("schoolAddress")} placeholder="123 Education St, City" />
            {errors.schoolAddress && <p className="text-red-500 text-sm">{errors.schoolAddress.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Contact Information</Label>
            <Input {...register("contactInfo")} placeholder="Phone or Email" />
          </div>

          <div className="space-y-4 pt-4 border-t dark:border-gray-800">
            <Label className="text-lg font-semibold">Choose Your Result Template</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((t) => (
                <div 
                  key={t.id}
                  onClick={() => setValue("templateId", t.id as any)}
                  className={`relative cursor-pointer group rounded-xl border-2 transition-all overflow-hidden ${
                    selectedTemplate === t.id 
                      ? "border-blue-600 ring-2 ring-blue-600/20 shadow-lg shadow-blue-500/10" 
                      : "border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800 shadow-sm"
                  }`}
                >
                  <div className="aspect-3/4 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        selectedTemplate === t.id ? "scale-105" : "group-hover:scale-105"
                      }`}
                    />
                  </div>
                  
                  {selectedTemplate === t.id && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-md z-10">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}

                  <div className="p-3 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
                    <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-100">{t.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {errors.templateId && <p className="text-red-500 text-sm">{errors.templateId.message}</p>}
          </div>

          <div className="space-y-2 pt-2 border-t dark:border-gray-800">
            <Label>School Logo (Optional)</Label>
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo preview" className="w-16 h-16 object-contain border dark:border-gray-800 rounded-md" />
              ) : (
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-md flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs text-center border-dashed">No Logo</div>
              )}
              <Input type="file" accept="image/*" onChange={handleLogoUpload} className="flex-1 cursor-pointer" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Recommended: Square PNG with transparent background</p>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Complete Setup"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetupWizard;
