import { generateSectionContent } from "../utils/reportMdxGenerator";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { Request, Response } from "express";

export const generateContent = asyncHandler(async (req: Request, res: Response) => {
    const { title, promptContent } = req.body;
    if (!title || !promptContent) throw new ApiError(400, "Missing required fields");
    const content = await generateSectionContent(title, promptContent);
    return res.status(200).json(new ApiResponse(200, "Content generated successfully", content, true));
});