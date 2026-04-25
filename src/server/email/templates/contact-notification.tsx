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
  return (
    <div
      style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}
    >
      <h1
        style={{
          color: "#333",
          borderBottom: "2px solid #eee",
          paddingBottom: "10px",
        }}
      >
        New Contact Form Submission
      </h1>

      <div style={{ marginTop: "20px" }}>
        <p style={{ margin: "10px 0" }}>
          <strong style={{ color: "#666" }}>From:</strong> {name} ({email})
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong style={{ color: "#666" }}>Subject:</strong> {subject}
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </div>
      </div>

      <p style={{ marginTop: "30px", fontSize: "12px", color: "#999" }}>
        This email was sent from your portfolio contact form.
      </p>
    </div>
  );
}
