import { googleLogin, currentUser,logout } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/google-login", googleLogin);
router.route("/current-user").get(authMiddleware, currentUser);
router.route("/logout").get(authMiddleware, logout);


export default router;