import { SendMailDTO } from "@/types/worker";
import nodemailer from "nodemailer";

export class EmailRepository {
  private transporter: any;
  private APP_PASSWORD: string;
  private APP_EMAIL: string;

  constructor() {
    this.APP_EMAIL = process.env.APP_EMAIL as string;
    this.APP_PASSWORD = process.env.APP_PASSWORD as string;

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: process.env.NODE_ENV === "production",
      auth: {
        user: this.APP_EMAIL,
        pass: this.APP_PASSWORD,
      },
    });
  }
  SendMail = async (data: SendMailDTO) => {
    const { email, subject, content } = data;
    try {
      await this.transporter.sendMail({
        from: `"Moments Planner Team" <${this.APP_EMAIL}>`,
        to: email,
        subject: subject,
        html: content,
      });
      console.log("[EMAIL WORKER] Email sent successfully");
      return { success: true };
    } catch (err) {
      console.error("[EMAIL WORKER] Error while sending mail", err);
      return { success: false };
    }
  };
}
