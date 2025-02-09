import { googleLogin, currentUser,logout, resetCredits } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/google-login", googleLogin);
router.route("/current-user").get(authMiddleware, currentUser);
router.route("/logout").get(authMiddleware, logout);
router.route("/reset-credits").post(resetCredits);


export default router;