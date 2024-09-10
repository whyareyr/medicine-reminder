// utils/emailSender.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmailReminder = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
