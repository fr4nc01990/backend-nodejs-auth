import { Router } from "express";
import { addItem } from "../controllers/postController";

const router = Router();

router.post("/", addItem);

export default router;
