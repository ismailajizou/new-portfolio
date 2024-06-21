import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string(),
  title: z.string(),
  company: z.string(),
  text: z.string().min(10).max(300),
  image: z.string().optional(),
});

export type TTestimonial = z.infer<typeof testimonialSchema>;