"use server";

import { resend } from "./resend";
import { ContactNotificationEmail } from "./templates/contact-notification";
import { env } from "@/env.js";

interface SendContactNotificationParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: SendContactNotificationParams) {
  const { data, error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: [env.RESEND_FROM_EMAIL],
    subject: `New contact from ${name}: ${subject}`,
    react: ContactNotificationEmail({ name, email, subject, message }),
    replyTo: email,
    tags: [
      { name: "category", value: "contact" },
      { name: "source", value: "portfolio" },
    ],
  });

  if (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
