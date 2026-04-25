"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { testimonials } from "@/server/db/schema";
import { headers } from "next/headers";
import {
  testimonialSchema,
  type TTestimonial,
} from "@/validators/testimonials";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const writeTestimonial = async (data: TTestimonial) => {
  try {
    const { name, title, company, text } = testimonialSchema.parse(data);
    const [testimonial] = await db
      .insert(testimonials)
      .values({
        name,
        title,
        company,
        text,
        status: "PENDING",
      })
      .returning();
    return {
      message: "Testimonial created successfully",
      data: {
        id: testimonial!.id,
        name: testimonial!.name,
        title: testimonial!.title,
        company: testimonial!.company,
        text: testimonial!.text,
        status: testimonial!.status,
        createdAt: testimonial!.createdAt,
        updatedAt: testimonial!.updatedAt,
      },
    };
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create testimonial");
  }
};

export const publishTestimonial = async (id: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  try {
    const [testimonial] = await db
      .update(testimonials)
      .set({ status: "APPROVED" })
      .where(eq(testimonials.id, id))
      .returning();
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }
    revalidatePath("/admin/testimonials");
    return {
      message: "Testimonial published successfully",
      data: {
        id: testimonial.id,
        name: testimonial.name,
        title: testimonial.title,
        company: testimonial.company,
        text: testimonial.text,
        status: testimonial.status,
        createdAt: testimonial.createdAt,
        updatedAt: testimonial.updatedAt,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("Failed to publish testimonial");
  }
};

export const rejectTestimonial = async (id: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  try {
    const [testimonial] = await db
      .update(testimonials)
      .set({ status: "REJECTED" })
      .where(eq(testimonials.id, id))
      .returning();
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
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  try {
    const [testimonial] = await db
      .delete(testimonials)
      .where(eq(testimonials.id, id))
      .returning();
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }
    // if (testimonial.image) {
    //   await utapi.deleteFiles(testimonial.image.split("/").at(-1)!);
    // }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("Failed to delete testimonial");
  }
  revalidatePath("/admin/testimonials");
};
