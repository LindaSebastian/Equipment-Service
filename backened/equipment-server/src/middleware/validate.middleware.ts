import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
        next(new ApiError(400, error.errors[0].message));
    }
};
