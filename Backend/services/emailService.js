import nodemailer from 'nodemailer';

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para enviar el correo de confirmación
const sendConfirmationEmail = (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

export default sendConfirmationEmail;
