import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { UserType } from "../config/types";
import {  generateToken } from "../utils/auth";
import { Request, Response } from "express";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { calculateResetDate } from "../utils/resetDate";
import {app} from "../config/firebase-admin";
export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
        
        const { idtoken}:{idtoken: string} = req.body;
        if(!idtoken) throw new ApiError(400, "Missing required fields");
       const decodedToken = await app.auth().verifyIdToken(idtoken)
       const { name, email } = decodedToken
        let user = await User.findOne({ email, loginType: "google" });
        if(user) {
            const token = generateToken(user._id);
            res.cookie("token", token, { httpOnly: true , sameSite: "none" ,secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            return res.status(200).json(new ApiResponse(200, "Login successful", user, true));
        }
        user = await User.create({ name, email , loginType: "google"});
        if(!user) throw new ApiError(500, "Error while signing up");
        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true , sameSite: "none", secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(200).json(new ApiResponse(200, "Login successful", user, true));  
})

export const currentUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user) throw new ApiError(401, "Error while fetching user");
    return res.status(200).json(new ApiResponse(200, "Current user fetched successfully", user, true));
})

export const logout = asyncHandler(
    async (req: Request, res: Response) => {
        res.clearCookie("token", { httpOnly: true , sameSite: "none", secure: true });
        return res.status(200).json(new ApiResponse(200, "Logout successful", null, true));
    }
)
const shouldResetCredits = (creditsResetDate: string) => {
    const now = new Date();
    const resetDate = new Date(creditsResetDate);
    return now.getDate() === resetDate.getDate() && now.getMonth() === resetDate.getMonth() && now.getFullYear() === resetDate.getFullYear();
};

export const resetCredits = asyncHandler(async (req: Request, res: Response) => {
    if(req.headers['authorization'] !== `Bearer ${process.env.ADMIN_KEY}`) throw new ApiError(401, "Unauthorized");
    const users = await User.find().sort({ createdAt: -1 });
    const updatedUsers = users
    .filter((user) => shouldResetCredits( user.creditsResetDate as string))
    .map(async (user) => {
        user.creditsUsed = 0;
        user.creditsResetDate = calculateResetDate(new Date());
        await user.save();
    })
    await Promise.all(updatedUsers);
    return res.status(200).json(new ApiResponse(200, `Credits reset successfully for ${updatedUsers.length} users`, null, true));
});