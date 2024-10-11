import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import db from "./database/db.js"; // Se importa para conectar a la base de datos
import cookieParser from 'cookie-parser';

// Importaciones de rutas de la API
import userRoutes from './routes/user.routes.js'; // Se importa la ruta de usuario
import patientRoutes from './routes/patient.routes.js'


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Routes
app.use('/api', userRoutes, patientRoutes);

app.listen(PORT, () => {
    console.log('Server UP running in http://localhost:', PORT)
})