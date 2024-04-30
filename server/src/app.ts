import express from 'express';
import exampleRouter from './routes/homeRoutes';

const app = express();

app.use(express.json());
app.use('/api/example', exampleRouter);

export default app;