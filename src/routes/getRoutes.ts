import { Router } from "express";
import { getJsonData } from "../controllers/getController";

const router = Router();

router.get("/", getJsonData);

export default router;
