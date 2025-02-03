import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateToken = (_id: string) => jwt.sign({ _id }, config.JWT_SECRET, { expiresIn: "7d" });

export const verifyToken = (token: string) => jwt.verify(token, config.JWT_SECRET);
