import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import { ApiResponse } from "../utils/ApiResponse";
export const sendEmailFeedback = asyncHandler(async (req: Request, res: Response) => {
    const { email, name, message } = req.body;
    await sendEmail(email, name, message, 1);
    await sendEmail(email, name, message, 2);
    return res.status(200).json(new ApiResponse(200, "Email sent successfully", null, true));
})