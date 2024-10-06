import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        // Se verifica si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Se encripta la contraseña del usuario y se crea el nuevo usuario
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Se crea el nuevo usuario
        const newUser = new User({ name, lastname, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuario creado exitosamente" });

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
}

export const getUserbyEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ exists: false });
        }

        res.status(200).json({ exists: true });
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

        // Buscar el usuario por su correo electrónico
        const user = await User.findOne({ email });

        // Si no se encuentra el usuario, devolver un error genérico
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña es incorrecta, devolver un error genérico
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Enviar el token en la respuesta
        res.json({ token });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};