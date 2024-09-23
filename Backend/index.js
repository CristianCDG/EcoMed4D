import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import db from "./database/db.js"; // Se importa para conectar a la base de datos

// Importaciones de rutas de la API
import userRoutes from './routes/user.routes.js'; // Se importa la ruta de usuario

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log('Server UP running in http://localhost:', PORT)
})