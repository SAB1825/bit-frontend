import { z } from "zod";

export const createComplaintSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  availableTiming: z.object({
    date: z.date(),
    time: z.string()
  }),
  image: z.instanceof(File).optional()
});

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>;