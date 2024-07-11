import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  company: z.string().min(2).max(50),
  text: z.string().min(10).max(300),
  image: z.string().optional(),
});

export type TTestimonial = z.infer<typeof testimonialSchema>;