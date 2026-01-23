import { z } from "zod";

export const createEquipmentSchema = z.object({
  name: z.string().min(2),
  serialNumber: z.string().min(3),
  location: z.string().min(2),
});
