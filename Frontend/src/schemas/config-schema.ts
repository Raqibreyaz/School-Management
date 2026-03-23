import { z } from "zod";

export const configSchema = z.object({
  schoolName: z.string().min(3, "School name must be at least 3 characters"),
  schoolAddress: z.string().min(5, "Address is required"),
  contactInfo: z.string().optional(),
  themeColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  templateId: z.enum(["classic", "modern", "vibrant", "professional", "sidebar"]),
});
