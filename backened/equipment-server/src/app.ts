import express from 'express';
import equipmentRoutes from './routes/equipment.routes';
import { errorHandler } from './middleware/error.middleware';
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/equipment', equipmentRoutes);
app.use(errorHandler);
export default app;
