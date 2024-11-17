"use server";

import { auth } from "@/server/auth";
import connectMongo from "@/server/db";
import Testimonial from "@/server/db/models/testimonial";
import { utapi } from "@/server/uploadthing";
import {
  testimonialSchema,
  type TTestimonial,
} from "@/validators/testimonials";
import { revalidatePath } from "next/cache";

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("Failed to create testimonial");
  }
};

export const publishTestimonial = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  try {
    await connectMongo();
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { status: "APPROVED" },
      { new: true },
    );
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }
    return {
      message: "Testimonial published successfully",
      data: {
        ...testimonial.toJSON(),
        _id: testimonial._id.toString(),
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("Failed to publish testimonial");
  }
};

export const rejectTestimonial = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  try {
    await connectMongo();
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { status: "REJECTED" },
      { new: true },
    );
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("Failed to reject testimonial");
  }
  revalidatePath("/admin/testimonials");
};

export const deleteTestimonial = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  try {
    await connectMongo();
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }
    if (testimonial.image) {
      await utapi.deleteFiles(testimonial.image.split("/").at(-1)!);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("Failed to delete testimonial");
  }
  revalidatePath("/admin/testimonials");
};
