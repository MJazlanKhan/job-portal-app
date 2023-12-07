import express from "express";
import AuthController from "../controller/authController.js"
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
// import cloudinary from 'cloudinary';
// import BlogPost from '../models/blogPostModel.js'
import mongoose from "mongoose";
// import multer from "multer"
import authModel from "../models/authModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();


// All Routes

router.post('/user/studentSignup', AuthController.userRegisteration)
router.post('/user/companySignup', AuthController.companyRegisteration)
router.post('/user/userLogin', AuthController.userLogin)
router.post('/user/companyLogin', AuthController.companyLogin)
router.post('/admin', AuthController.adminLogin)
// router.post('/user/reset', AuthController.userReset)
// router.get('/company/:companyId', AuthController.companyProfile)
router.get('/user/:userId', AuthController.userProfile)
router.get('/company/:userId', AuthController.companyProfile)
router.get('/public/company/:userId', AuthController.PublicCompany)
router.post('/company/createjobpost', AuthController.createJobPost)
router.get('/posts', AuthController.allPost)
router.get('/allCompanies', AuthController.allCompanies)
router.get('/allUsers', AuthController.allUsers)
router.get('/adminallPost', AuthController.adminallPost)
router.put('/updateStatus/:id', AuthController.updateStatus)
router.put('/CompanyupdateStatus/:id', AuthController.updateCompanyStatus)
router.put('/UserupdateStatus/:id', AuthController.updateUserStatus)
router.get('/posts/:Jobid', AuthController.SinglePost)
router.get('/company/posts/:userId', AuthController.CompanyPosts)
router.get('/display/company/posts/:userId', AuthController.DisplayCompanyPosts)
// router.get('/posts/:postId', AuthController.singlePost)
router.put('/posts/:postId', AuthController.updatePost)
router.put('/company/:userId', AuthController.updateCompany)
router.put('/user/:userId', AuthController.updateProfile)
// router.get('/user/job/Apply', AuthController.ApplyJob)
router.put('/user/jobapply/:postId', AuthController.ApplyJob)
router.delete('/posts/:postId', AuthController.deletePost)


  


export default router;
