import { Router } from "express";
import { createUser, getUserbyEmail, getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', createUser); // Se crea el usuario

router.get('/:email', getUserbyEmail); // Se obtiene el usuario por email

router.get('/', getUsers); // Se obtienen todos los usuarios

router.put('/:email', updateUser); // Se actualiza el usuario por email

router.delete('/:email', deleteUser); // Se elimina el usuario por email

export default router;