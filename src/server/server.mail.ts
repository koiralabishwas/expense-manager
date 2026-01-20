"use server"

import { mailTransporter } from "@/configs/mail";

export async function sendTestMail() {
  await mailTransporter.sendMail({
  from: process.env.GMAIL_USER,
  to: "wasubisu69@gmail.com",
  subject: "Test , lgtm",
  text: "looks good to me",
});
}
