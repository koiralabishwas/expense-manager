import { mailTransporter } from "@/configs/mail";

export async function sendMail(to: string, subject: string , text : string) {
  await mailTransporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
    // html : // later user html for a more structured mail
  });
}

