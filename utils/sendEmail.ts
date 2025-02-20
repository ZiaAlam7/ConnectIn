import nodemailer from "nodemailer";

type MailOptions = {
  email: string;
  subject: string;
  message: string;
  resetLink: string;
};

export async function sendMail({ email, subject, message, resetLink }: MailOptions) {
  try {
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: `<p>${message}</p>`,
      html: `<p style="font-size:16px;">You requested a password reset.</p>
      <p>Click the button below to reset your password:</p>
      <p>
        <a href="${resetLink}" style="display:inline-block; padding:10px 20px; background-color:#007bff; color:#fff; text-decoration:none; font-weight:bold; border-radius:5px;">Reset Password</a>
      </p>
      <p>Or copy and paste this link into your browser:</p>
      <p><a href="${resetLink}" style="word-break:break-all;">${resetLink}</a></p>
      <br>
      <p>If you didn't request this, please ignore this email.</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
