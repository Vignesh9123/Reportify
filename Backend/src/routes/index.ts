import { Router } from "express";
import authRouter from "./auth.route";
import reportRouter from "./report.route";
import contentRouter from "./content.route";
import emailRouter from "./email.routes";
const router = Router();

router.use("/auth", authRouter);
router.use("/report", reportRouter);
router.use("/content", contentRouter);
router.use("/email", emailRouter);

export default router;