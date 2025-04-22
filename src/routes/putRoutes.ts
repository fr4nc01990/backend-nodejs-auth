import { Router } from "express";
import { updateItem } from "../controllers/putController";

const router = Router();

router.put("/:id", updateItem);

export default router;
