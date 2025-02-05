import { Router } from "express";
import { generateReport,deletePersonalReports,deleteReport,expireReports,getReport,getReports } from "../controllers/report.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.route("/generate").post(authMiddleware, generateReport);
router.route("/get-report").get(authMiddleware, getReport)
router.route('/get-all-reports').get(authMiddleware, getReports)
router.route('/delete').delete(authMiddleware,deleteReport)
router.route('/delete-all-reports').delete(authMiddleware, deletePersonalReports)
router.route('/expire').delete(authMiddleware, expireReports)

export default router;