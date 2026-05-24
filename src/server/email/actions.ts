"use server";

import { transporter } from "./transporter";
import { ContactNotificationEmail } from "./templates/contact-notification";
import { ContactAcknowledgementEmail } from "./templates/contact-acknowledgement";
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
  try {
    // 1. Send notification to yourself
    await transporter.sendMail({
      from: env.SMTP_USER,
      to: env.SMTP_USER,
      replyTo: email,
      subject: `New contact from ${name}: ${subject}`,
      html: ContactNotificationEmail({ name, email, subject, message }),
    });

    // 2. Send acknowledgement to the person who contacted you
    await transporter.sendMail({
      from: env.SMTP_USER,
      to: email,
      subject: "Thanks for reaching out!",
      html: ContactAcknowledgementEmail({ name }),
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: (error as Error).message };
  }
}
