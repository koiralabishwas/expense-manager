import nodemailer from "nodemailer"

export const mailTransporter = nodemailer.createTransport({
  service : "gmail" ,
    auth: {
    user: process.env.GMAIL_USER, // your@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // NOT your normal password
  }
})
