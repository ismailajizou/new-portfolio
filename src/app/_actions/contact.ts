"use server";

import connectMongo from "@/server/db";
import Contact from "@/server/db/models/contact";
import { revalidatePath } from "next/cache";
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


export const removeContact = async (id: string) => {
  try {
    await connectMongo();
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw new Error("Contact not found");
    }
  } catch (error) {
    throw new Error("Failed to delete contact");
  }
  revalidatePath("/admin/contacts");
}