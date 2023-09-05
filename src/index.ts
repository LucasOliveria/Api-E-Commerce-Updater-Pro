import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT);