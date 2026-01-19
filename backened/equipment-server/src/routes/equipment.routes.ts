import { Router } from 'express';
import prisma from '../config/prisma';

const router = Router();

router.post('/', async (req, res) => {
  const equipment = await prisma.equipment.create({
    data: req.body
  });
  res.status(201).json(equipment);
});

router.get('/', async (_req, res) => {
  const list = await prisma.equipment.findMany({
    include: { parts: true }
  });
  res.json(list);
});

export default router;
