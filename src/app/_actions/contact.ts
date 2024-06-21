"use server";

import connectMongo from "@/db/connection";
import Contact from "@/db/models/contact";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export type Contact = z.infer<typeof contactSchema>;

export const contact = async (contact: Contact) => {
  try {
    await connectMongo();
    const { email, message, name } = contactSchema.parse(contact);

    const letter = await Contact.create({ email, message, name });

    return {
      message: "Your message has been sent successfully",
      data: {
        ...letter.toJSON(),
        _id: letter._id.toString(),
      },
    };
  } catch (error) {
    throw new Error("Failed to send message");
  }
};
