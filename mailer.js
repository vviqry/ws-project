const nodmailer = require("nodemailer");
require("dotenv").config();

const smtp = nodmailer.createTransport({
  host: process.env.MAILER_SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.MAILER_SMTP_USER,
    pass: process.env.MAILER_SMTP_PASSWORD,
  },
});

const now = () => new Date().toLocaleString();

// Send an email using async/await
(async () => {
  console.log(`${now()} - Preparing to send email...`);

  await smtp.sendMail({
    from: process.env.MAILER_DEFAULT_SENDER_EMAIL,
    to: "admin@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: "<b>Hello world?</b>", // HTML version of the message
  });

  console.log(`${now()} - Email sent successfully!`);
})();
