import { Router } from "express";
import { generateContent } from "../controllers/content.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();


router.route("/generate").post(authMiddleware, generateContent);

export default router;
