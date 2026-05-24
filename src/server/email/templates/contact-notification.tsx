interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
}: ContactNotificationEmailProps) {
  return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
      New Contact Form Submission
    </h1>

    <div style="margin-top: 20px;">
      <p style="margin: 10px 0;">
        <strong style="color: #666;">From:</strong> ${name} (${email})
      </p>
      <p style="margin: 10px 0;">
        <strong style="color: #666;">Subject:</strong> ${subject}
      </p>

      <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px; white-space: pre-wrap;">
        ${message}
      </div>
    </div>

    <p style="margin-top: 30px; font-size: 12px; color: #999;">
      This email was sent from your portfolio contact form.
    </p>
  </div>`;
}
