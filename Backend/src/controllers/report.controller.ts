import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import {ApiResponse} from '../utils/ApiResponse'
import { asyncHandler } from "../utils/asyncHandler";
import {createDocument} from "../utils/docsHelper";
import { professorDetailsType, submissionDetailsType } from "../config/types";
import { uploadBuffer } from "../utils/uploadThing";
import { Report } from "../models/report.model";
import { utapi } from "../config/uploadThing";

export const generateReport = asyncHandler(async (req: Request, res: Response) => {
    const {topic,content, submissionDetails, professorDetails}:{topic: string, submissionDetails: submissionDetailsType[], professorDetails: professorDetailsType, content: string} = req.body;
    if(!topic) throw new ApiError(400, "Topic is required");
    if(!content) throw new ApiError(400, "Content is required");
    if(!submissionDetails) throw new ApiError(400, "Submission details are required");
    if(!professorDetails) throw new ApiError(400, "Professor details are required");
    console.log("Generating report");
    const fileBuffer = await createDocument(topic,content, res, submissionDetails, professorDetails);
    if(!fileBuffer) throw new ApiError(500, "Error while generating report");
    console.log("Uploading buffer to uploadThing")
    const key = await uploadBuffer(fileBuffer, `${req.user._id+Date.now()}.docx`);
    console.log("Uploaded buffer to uploadThing")
    if(!key) throw new ApiError(500, "Error while uploading report");
    console.log("Storing report in DB");
    const report = await Report.create({topic, submissionDetails, professorDetails, key, userId: req.user._id});
    if(!report) throw new ApiError(500, "Error while creating report");  
    console.log("Stored report in DB");
    res.set({
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=generated.docx",
      });
    return res.status(200).end(fileBuffer);    
})

export const getReports = asyncHandler(async (req: Request, res: Response) => {
    const reports = await Report.find({userId: req.user._id});
    reports.forEach((report) => report.key = '');
    if(!reports) throw new ApiError(500, "Error while fetching reports");
    return res.status(200).json(new ApiResponse(200, "Reports fetched successfully", reports, true));
})

export const getReport = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.query)
    const report = await Report.findById(req.query.id);
    if(!report) throw new ApiError(500, "Error while fetching report");
    if(report.userId.toString() !== req.user._id.toString()) throw new ApiError(401, "Unauthorized");
    const response = await fetch(`https://utfs.io/f/${report.key}`);
    if(!response.ok) throw new ApiError(500, "Error while fetching report");
    const buffer = await response.arrayBuffer()
    res.type('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    return res.status(200).send(Buffer.from(buffer));
})

export const deletePersonalReports = asyncHandler(async (req: Request, res: Response) => {
    const reports = await Report.find({userId: req.user._id});
    reports.forEach(async(report)=>{
        await utapi.deleteFiles(report.key)
        await report.deleteOne()
    })
    return res.status(200).json(new ApiResponse(200, "Reports deleted successfully", null, true));
})

export const deleteReport = asyncHandler(async (req: Request, res: Response) => {
    const report = await Report.findById(req.query.id)
    if(!report) throw new ApiError(400, "Sorry the report doesn't exist");
    if(report.userId.toString() != req.user._id.toString()) throw new ApiError(401, "Unauthorized");
    await utapi.deleteFiles(report.key)
    await report.deleteOne()
    return res.status(200).json(new ApiResponse(200, "Report deleted successfully",null, true));
})

export const expireReports = asyncHandler(async(req: Request, res:Response)=>{
    const reports = await Report.find();
    reports.forEach(async(report)=>{
        if(Date.now() - new Date(report.createdAt).getTime() > 3 * 24 * 60 * 60 * 1000 ){
            await utapi.deleteFiles(report.key)
            report.isExpired = true
            await report.save()
        }
    })
    return res.status(200).json(new ApiResponse(200, 'Expired the old files', null, true))
})