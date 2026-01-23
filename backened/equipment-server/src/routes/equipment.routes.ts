import e, { Router } from "express";
import { createEquipmentSchema } from "../validations/equipment.schema";
// import * as equipmentService from "../service/equipment.service";
import { validate } from "../middleware/validate.middleware";
import {
  createEquipmentController,
  getAllEquipmentController,
} from "../controller/equipment.controller";

const router = Router();
//use of try cathch block for error handling is moved to error middleware
// Validation middleware can be used here for POST route when needed
// router.post('/', async (req, res) => {
//   try {
//     const validatedData = createEquipmentSchema.parse(req.body);
//     const equipment = await equipmentService.createEquipment(validatedData);
//     res.status(201).json(equipment);
//   } catch (err: any) {
//     res.status(400).json({
//       message: 'Invalid input',
//       error: err.errors ?? err.message,
//     });
//   }
// });

//using validation middleware for request body validation
//to make code cleaner, create controller more readable for res and err handling is moved to error middleware
// router.post('/', validate(createEquipmentSchema), async (req, res) => {
//   try {
//     const equipment = await equipmentService.createEquipment(req.body);
//     res.status(201).json(equipment);
//   } catch (err: any) {
//     res.status(400).json({
//       message: 'Invalid input',
//       error: err.message,
//     });
//   }
// });


// router.get('/', async (_req, res) => {
  //   try {
    //     const equipmentList = await equipmentService.getAllEquipment();
    //     res.json(equipmentList);
    //   } catch (err: any) {
      //     res.status(500).json({ message: 'Server error', error: err.message });
      //   }
      // });
      
router.post("/", validate(createEquipmentSchema), createEquipmentController);
router.get("/", getAllEquipmentController);

export default router;
