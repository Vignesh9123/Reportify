import { Router } from "express";
import { generateReport } from "../controllers/report.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.route("/generate").post(authMiddleware, generateReport);

export default router;