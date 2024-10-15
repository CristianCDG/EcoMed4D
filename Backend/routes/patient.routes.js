import { Router } from "express";

import { createPatient, getPatients } from "../controllers/patient.controller.js";

import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/patients', authRequired, getPatients);
router.post('/patients', authRequired, createPatient);


export default router;