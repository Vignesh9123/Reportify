import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {createDocument} from "../utils/docsHelper";
import { professorDetailsType, submissionDetailsType } from "../config/types";


export const generateReport = asyncHandler(async (req: Request, res: Response) => {
    const {topic, submissionDetails, professorDetails}:{topic: string, submissionDetails: submissionDetailsType[], professorDetails: professorDetailsType} = req.body;
    if(!topic) throw new ApiError(400, "Topic is required");
    await createDocument(topic, res, submissionDetails, professorDetails);
})