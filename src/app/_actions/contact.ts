"use server";

import { env } from "@/env";
import { sendContactNotification } from "@/server/email/actions";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.email(),
  subject: z.string().min(3).max(100),
  message: z.string().min(10).max(500),
  // turnstileToken: z.string(),
});

export type ContactInput = z.infer<typeof contactSchema>;

async function verifyTurnstileToken(token: string) {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
        response: token,
      }),
    },
  );

  const data = (await response.json()) as { success: boolean };
  return data.success;
}

export const contact = async (contactData: ContactInput) => {
  try {
    const { email, message, name, subject } = contactSchema.parse(contactData);

    // Verify CAPTCHA
    // const isValidCaptcha = await verifyTurnstileToken(turnstileToken);
    // if (!isValidCaptcha) {
    //   throw new Error("CAPTCHA verification failed. Please try again.");
    // }

    // Send email notification
    const result = await sendContactNotification({
      name,
      email,
      subject,
      message,
    });

    if (!result.success) {
      throw new Error("Failed to send email. Please try again later.");
    }

    return {
      message: "Your message has been sent successfully",
      data: {
        name,
        email,
        subject,
        message,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("Failed to send message");
  }
};
