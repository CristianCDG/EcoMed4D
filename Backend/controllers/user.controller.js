import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import sendConfirmationEmail  from "../services/emailService.js"; // Importar el servicio de correo

export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado. Por favor, use otro." });
        }

        // Generar token de confirmación
        const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: '3m' });

        // Enviar correo de confirmación con el token
        const mailOptions = {
            from: "ecomedd521@gmail.com",
            to: email,
            subject: "Confirmación de registro en EcoMed4D",
            text: `Hola ${name},\n\nPor favor, confirma tu correo haciendo clic en el siguiente enlace:\n\nhttp://localhost:3500/confirmar-email?token=${token}`,
        };

        await sendConfirmationEmail(mailOptions);

        res.status(200).json({ message: "Correo de confirmación enviado. Revisa tu bandeja de entrada." });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: "Error al registrar usuario." });
    }
};

// Controlador para confirmar el token y crear al usuario
export const confirmEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { email } = decoded;

        // Crear el usuario tras la confirmación
        const { name, lastname, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, lastname, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario creado exitosamente. Ya puedes iniciar sesión." });
    } catch (error) {
        console.error('Error al confirmar el token:', error);
        res.status(400).json({ message: "El enlace ha expirado o es inválido." });
    }
};

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
        if (!isMatch) {
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        }

        // Se genera el token de autenticación para el usuario
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //Comentario para hacer commit y quede registrada la incidencia en Jira

        res.cookie('token', token);
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};