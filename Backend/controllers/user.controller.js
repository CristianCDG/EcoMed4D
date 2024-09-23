import User from "../models/user.model.js";
import bycrypt from "bcryptjs";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, userType, birthDate, phone, address, notificationPreferences } = req.body;

        // Se verifica si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Se encripta la contraseña del usuario
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        // Se crea el nuevo usuario
        const newUser = new User({ name, email, password: hashedPassword, userType, birthDate, phone, address, notificationPreferences });
        await newUser.save();

        res.status(201).json({ message: "Usuario creado exitosamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
}