import { Router } from "express";
import { createUser, getUserbyEmail, getUsers, updateUser, deleteUser, loginUser, initiateRegistration, verifyEmail } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post('/initiate-registration', initiateRegistration); // Iniciar el proceso de registro
router.get('/verify-email', verifyEmail); // Verificar el token de correo electrónico

router.post('/register', createUser); // Se crea el usuario
router.get('/:email', getUserbyEmail); // Se obtiene el usuario por email
router.get('/', getUsers); // Se obtienen todos los usuarios
router.put('/:email', updateUser); // Se actualiza el usuario por email
router.delete('/:email', deleteUser); // Se elimina el usuario por email
router.post('/login', loginUser); // Ruta de inicio de sesión

export default router;