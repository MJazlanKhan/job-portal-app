import express from "express";
import mongoose from "mongoose";

const JobPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    CompanyId:{
        type: String,
    },
    Location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    Salary:{
        type: String,
        required: true,
    },
    summary:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    studentApplyName:[String],
    Status:{
        type: String,
    }
    
})

const JobPostModel = mongoose.model("JobPost", JobPostSchema);

export default JobPostModel