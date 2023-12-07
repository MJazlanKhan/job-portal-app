import express from "express";
import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
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
  nickname: {
    type: String,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  Status:{
    type: String,
}
})

const authModel = mongoose.model("users", authSchema);

export default authModel