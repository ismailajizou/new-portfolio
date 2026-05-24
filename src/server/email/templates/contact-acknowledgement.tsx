interface ContactAcknowledgementEmailProps {
  name: string;
}

export function ContactAcknowledgementEmail({
  name,
}: ContactAcknowledgementEmailProps) {
  return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
      Thank you for reaching out, ${name}!
    </h1>

    <div style="margin-top: 20px; line-height: 1.6; color: #444;">
      <p>
        I have received your message and will get back to you as soon as possible.
      </p>
      <p style="margin-top: 16px;">
        In the meantime, feel free to check out my portfolio or connect with me on social media.
      </p>
    </div>

    <p style="margin-top: 30px; font-size: 12px; color: #999;">
      This is an automated response. Please do not reply to this email.
    </p>
  </div>`;
}
