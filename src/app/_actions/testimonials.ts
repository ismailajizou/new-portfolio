"use server";

import connectMongo from "@/server/db";
import Testimonial from "@/server/db/models/testimonial";
import {
  testimonialSchema,
  type TTestimonial,
} from "@/validators/testimonials";

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
      status: "PENDING",
    });
    return {
      message: "Testimonial created successfully",
      data: {
        ...testimonial.toJSON(),
        _id: testimonial._id.toString(),
      },
    };
  } catch (error) {
    throw new Error("Failed to create testimonial");
  }
};
