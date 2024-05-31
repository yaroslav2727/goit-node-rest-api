import nodemailer from "nodemailer";

const { EMAIL_PASSWORD, EMAIL_FROM } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(config);

export function sendEmail(data) {
  const mail = { ...data, from: EMAIL_FROM };
  return transport.sendMail(mail);
}

export function sendVerificationEmail(email, verificationToken) {
  const verificationEmail = {
    to: email,
    subject: "Verification email",
    html: `
      <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify your email address!</a>
      <p>http://localhost:3000/api/users/verify/${verificationToken}</p>`,
  };
  return sendEmail(verificationEmail);
}
