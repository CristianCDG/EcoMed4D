import { Router } from "express";

import { createPatient, getPatients } from "../controllers/patient.controller.js";

import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/', authRequired, getPatients);
router.post('/', authRequired, createPatient);


export default router;