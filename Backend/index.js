import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}👌`);
});