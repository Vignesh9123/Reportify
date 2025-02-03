import { Router } from "express";
import authRouter from "./auth.route";
import reportRouter from "./report.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/report", reportRouter);

export default router;