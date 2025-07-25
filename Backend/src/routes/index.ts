import { Router } from "express";
import authRouter from "./auth.route";
import reportRouter from "./report.route";
import contentRouter from "./content.route";
const router = Router();

router.use("/auth", authRouter);
router.use("/report", reportRouter);
router.use("/content", contentRouter);

export default router;