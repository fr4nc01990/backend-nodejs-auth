import { Router } from "express";
import { deleteItem } from "../controllers/deleteController";

const router = Router();

router.delete("/:id", deleteItem);

export default router;
