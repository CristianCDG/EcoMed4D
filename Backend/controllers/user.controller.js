import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'; // Importar Nodemailer

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Usar tu servicio de correo
    auth: {
        user: process.env.EMAIL_USER, // Tu dirección de correo
        pass: process.env.EMAIL_PASS, // Tu contraseña de correo o contraseña de aplicación
    },
});

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Se verifica si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Se encripta la contraseña del usuario
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        // Se crea el nuevo usuario sin guardarlo en la base de datos
        const newUser = new User({ name, email, password: hashedPassword, isConfirmed: false });
        
        // Generar token de confirmación
        const confirmationToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const confirmationUrl = `http://login${confirmationToken}`;

        // Enviar correo de confirmación
        await transporter.sendMail({
            to: email,
            subject: 'Confirma tu cuenta',
            html: `<p>Gracias por registrarte. Por favor, confirma tu cuenta haciendo clic en el siguiente enlace:</p>
                   <a href="${confirmationUrl}">Confirmar cuenta</a>`,
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        res.status(201).json({ message: "Usuario creado exitosamente. Se ha enviado un correo de confirmación." });

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
}

export const confirmUser = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar el usuario por ID y actualizar su estado a confirmado
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.isConfirmed = true; // Asumiendo que tienes un campo isConfirmed en tu modelo
        await user.save();

        res.status(200).json({ message: "Cuenta confirmada exitosamente" });

    } catch (error) {
        console.error('Error al confirmar la cuenta:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getUserbyEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario por email:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { email } = req.params;
        const updateData = req.body;

        const updatedUser = await User.findOneAndUpdate({ email }, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Usuario actualizado exitosamente",
            user: updatedUser
        });

    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.params;

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Usuario eliminado exitosamente",
            user: deletedUser
        });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Se verifica si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Se verifica si la contraseña es correcta
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch || !user.isConfirmed) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos o cuenta no confirmada" });
        }

        // Se genera el token de autenticación para el usuario
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
