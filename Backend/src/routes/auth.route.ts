import { googleLogin, currentUser } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { Router } from "express";
import User from "../models/user.model";

const router = Router();

router.post("/google-login", googleLogin);
router.route("/current-user").get(authMiddleware, currentUser);


export default router;