import mongoose from "mongoose";
import { UserType } from "../config/types";

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
    }
}, { timestamps: true });

const User = mongoose.model<UserType>("User", userSchema);

export default User;