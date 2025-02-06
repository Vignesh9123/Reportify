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
            res.cookie("token", token, { httpOnly: true , sameSite: "none" ,secure: true, expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            return res.status(200).json(new ApiResponse(200, "Login successful", user, true));
        }
        user = await User.create({ name, email , loginType: "google"});
        if(!user) throw new ApiError(500, "Error while signing up");
        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true , sameSite: "none", secure: true,expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        return res.status(200).json(new ApiResponse(200, "Login successful", user, true));  
})

export const currentUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user) throw new ApiError(401, "Error while fetching user");
    return res.status(200).json(new ApiResponse(200, "Current user fetched successfully", user, true));
})