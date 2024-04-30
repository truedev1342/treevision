import express from 'express';
import homeRouter from './routes/homeRoutes';

const app = express();

app.use(express.json());
app.use('/api/home', homeRouter);

export default app;