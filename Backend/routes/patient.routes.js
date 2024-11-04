import { Router } from "express";
import { createPatient, getPatients, sendFileEmail } from "../controllers/patient.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', authRequired, getPatients);
router.post('/', authRequired, createPatient);
router.post('/send-file', authRequired, upload.single('file'), sendFileEmail);

export default router;