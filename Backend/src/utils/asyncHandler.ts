import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction)=> Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(err=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({ error: err.message });
    }
    else{
        return res.status(500).json({ error: "Internal server error" });
    }
});