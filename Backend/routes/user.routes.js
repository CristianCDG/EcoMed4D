import { Router } from "express";
import { createUser, getUserbyEmail, getUsers, updateUser, deleteUser, loginUser } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post('/users/register', createUser); // Se crea el usuario

router.get('/users/:email', getUserbyEmail); // Se obtiene el usuario por email

router.get('/users', getUsers); // Se obtienen todos los usuarios

router.put('/users/:email', updateUser); // Se actualiza el usuario por email

router.delete('/users/:email', deleteUser); // Se elimina el usuario por email

router.post('/users/login', loginUser); // Ruta de inicio de sesión

export default router;