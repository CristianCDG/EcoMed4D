import Patient from "../models/patient.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const getPatients = async (req, res) => {
    const patients = await Patient.find({
        medico: req.user.id
    }).populate('medico');
    console.log(patients);
    res.json(patients);
};

export const createPatient = async (req, res) => {
    const { name, email, password } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
        return res.status(400).json({ message: "El paciente ya existe" });
    }

    // Se encripta la contraseña del paciente y se crea el nuevo usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPatient = new Patient({
        name,
        email,
        password: hashedPassword,
        medico: req.user.id
    });

    const savedPatient = await newPatient.save();
    res.json(savedPatient);
};

export const deletePatient = async (req, res) => {
    const { email } = req.params;
    const patientFound = await Patient.findOneAndDelete({ email });
    if (!patientFound) return res.status(404).json({ message: "Paciente no encontrado" });
    return res.status(204).json({
        message: "Paciente eliminado",
        name: patientFound.name,
        email: patientFound.email,
    });
};

export const sendFileEmail = async (req, res) => {
    const { patientId, patientName, patientEmail } = req.body;
    const file = req.file;

    if (!patientId || !file || !patientName || !patientEmail) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        // Configura el transportador de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Configura el correo electrónico
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: patientEmail,
            subject: 'Archivo adjunto',
            text: `Hola ${patientName},\n\nPor favor, encuentra el archivo adjunto.`,
            attachments: [
                {
                    filename: file.originalname,
                    path: file.path,
                },
            ],
        };

        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);

        // Elimina el archivo después de enviarlo
        fs.unlinkSync(file.path);

        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo' });
    }
};