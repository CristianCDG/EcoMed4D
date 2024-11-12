import { Router } from "express";
import { createPatient, getPatients, loginPatient, sendFileEmail } from "../controllers/patient.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', authRequired, getPatients); // Ruta para obtener todos los pacientes
router.post('/', authRequired, createPatient); // Ruta para crear un nuevo paciente

router.post('/send-file', authRequired, upload.array('files', 2), sendFileEmail); // Ruta para enviar archivos adjuntos

router.post('/login', loginPatient); // Ruta de inicio de sesión

export default router;