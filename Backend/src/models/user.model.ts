import mongoose from "mongoose";
import { UserType } from "../config/types";
import { calculateResetDate } from "../utils/resetDate";
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    password: { 
        type: String, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    role: { 
        type: String, 
        required: true, 
        default: "user", 
        enum: ["admin", "user"] 
    },
    loginType: {
        type: String,
        required: true,
        default: "email",
        enum: ["email", "google"]
    },
    creditsUsed: {
        type: Number,
        default: 0
    },
    maxCredits: {
        type: Number,
        default: 5
    },
    creditsResetDate: {
        type: Date,
        default: calculateResetDate(new Date())
    }
}, { timestamps: true });

const User = mongoose.model<UserType>("User", userSchema);

export default User;