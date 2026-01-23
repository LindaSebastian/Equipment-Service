import { Request, Response, NextFunction } from "express";
import * as equipmentService from "../service/equipment.service";

export const createEquipmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const equipment = await equipmentService.createEquipment(req.body);
    res.status(201).json(equipment);
  } catch (error) {
    next(error);
  }
};
export const getAllEquipmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try { 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const status = req.query.status as string | undefined;
    const location = req.query.location as string | undefined;
    const sortBy = (req.query.sortBy as string);
    const order = (req.query.order as string);
    const equipmentList = await equipmentService.getAllEquipment({ page, limit, status, location, sortBy, order });
    res.json(equipmentList);
  } catch (error) {
    next(error);
  } 
};