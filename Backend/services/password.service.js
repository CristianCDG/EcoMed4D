import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function sendMailResetPassword(direccion, token) {
    transporter.sendMail({
        from: "EcoMaster 👶 <ecomedd521@gmail.com>",
        to: direccion,
        subject: "Restablecimiento de contraseña",
        html: createMailResetPassword(token)
    });
}

function createMailResetPassword(token) {
    return `
    <!DOCTYPE html>
    <html lang="es">
        <style>
            html {
                background-color: white;
            }
            body {
                max-width: 600px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: auto;
                background-color: rgb(229, 255, 246);
                padding: 40px;
                border-radius: 4px;
                margin-top: 10px;
            }
        </style>
        <body>
            <h1>Restablecimiento de contraseña - EcoMed4D.com</h1>
            <p>Recibimos una solicitud para restablecer la contraseña de su cuenta en EcoMed4D.com.</p>
            <p>Si no solicitó este cambio, puede ignorar este correo.</p>
            <p>Para restablecer su contraseña, haga clic en el siguiente enlace: <a href='http://localhost:4000/reset-password/${token}' target="_blank" rel="noopener noreferrer">Restablecer contraseña</a></p>
            <p>Esteban Marini V</p>
            <p>Document manager EcoMed4D.</p>
        </body>
    </html>
    `;
}
