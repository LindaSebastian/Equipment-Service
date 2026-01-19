import express from 'express';
import equipmentRoutes from './routes/equipment.routes';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/equipment', equipmentRoutes);

export default app;
