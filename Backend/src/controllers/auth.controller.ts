import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { UserType } from "../config/types";
import {  generateToken } from "../utils/auth";
import { Request, Response } from "express";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
        const { name, email}:{name: string, email: string} = req.body;
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
const shouldResetCredits = (createdAt: string) => {
    const now = new Date();
    const joinDate = new Date(createdAt);

    const yearsDiff = now.getFullYear() - joinDate.getFullYear();
    const monthsDiff = now.getMonth() - joinDate.getMonth();
    const totalMonths = yearsDiff * 12 + monthsDiff;

    // Adjust for leap years or months with fewer days
    const maxJoinDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
    const effectiveJoinDate = Math.min(joinDate.getDate(), maxJoinDate.getDate());

    return totalMonths > 0 && now.getDate() === effectiveJoinDate;
};

export const resetCredits = asyncHandler(async (req: Request, res: Response) => {
    if(req.headers['authorization'] !== `Bearer ${process.env.ADMIN_KEY}`) throw new ApiError(401, "Unauthorized");
    const users = await User.find().sort({ createdAt: -1 });
    const updatedUsers = await Promise.all(
        users.map(async (user) => {
            if (shouldResetCredits(user.createdAt as string)) {
                user.creditsUsed = 0;
                await user.save();
            }
            return user;
        })
    )
    return res.status(200).json(new ApiResponse(200, `Credits reset successfully for ${updatedUsers.length} users`, null, true));
});