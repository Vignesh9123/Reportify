import mongoose from "mongoose";
import {ReportType} from "../config/types";
const reportSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    key:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    submissionDetails: {
        type: Array,
        required: true
    },
    professorDetails: {
        type: Object,
        required: true
    },
    isExpired:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
})


export const Report = mongoose.model<ReportType>("Report", reportSchema);