import express from "express";
import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirm: {
        type: String,
        required: true,
    },
    CompanyName: {
        type: String,
        required: true,
    },
    CompanyAddress:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    intro:{
        type: String,
        required: true,
    },
     Status:{
        type: String,
    }
})

const companyModel = mongoose.model("Companies", CompanySchema);

export default companyModel