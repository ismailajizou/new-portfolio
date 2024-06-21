"use server";

import connectMongo from "@/db/connection";
import Testimonial from "@/db/models/testimonial";
import { testimonialSchema, type TTestimonial } from "@/validators/testimonials";

export const writeTestimonial = async (data: TTestimonial) => {
  try {
    await connectMongo();
    const { name, title, company, text, image } = testimonialSchema.parse(data);
    const testimonial = await Testimonial.create({
      name,
      title,
      company,
      text,
      image,
    });
    return {
      message: "Testimonial created successfully",
      data: testimonial.toJSON(),
    };
  } catch (error) {
    throw new Error("Failed to create testimonial");
  }
};
