import authModel from "../models/authModel.js"
import companyModel from "../models/companyModel.js";
import JobPostModel from "../models/JobPostModel.js"
import adminModel from "../models/adminModel.js"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
class AuthController {
    static adminLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await adminModel.findOne({email:email})
              if (isEmail) {
                if (isEmail.email === email) {
                  const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
                    expiresIn: "2d"
                  });
                  return res.status(200).json({
                    message: "Login Sucessfully",
                    token,
                    username: isEmail.nickname,
                    type: "admin",
                    Id: isEmail._id,
                    email: isEmail.email
                  });
                } else {
                  return res.status(400).json({ message: "Wrong Credentials" })
          
                }
              } else {
                return res.status(400).json({ message: "Email ID Not Found!!" })
              }
            } else {
                
              return res.status(400).json({ message: "All Fields are Required" })
            }
          } catch (error) {
            return res.status(400).json({ message: error.message })
          }
        }
    static userRegisteration = async (req, res) => {
        const { email, password, confirm, nickname, residence, phone, Status } = req.body;
        try {
            if (email, password, confirm, nickname, residence, phone, Status) {
                const isUser = await authModel.findOne({ email: email });
                if (!isUser) {
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashPassword = await bcryptjs.hash(password, genSalt);

                    const newUser = new authModel({
                        email: email,
                        password: hashPassword,
                        confirm: password,
                        nickname: nickname,
                        residence: residence,
                        phone: phone,
                        Status: Status
                    })
                    const savedUser = await newUser.save()
                    if (savedUser) {
                        return res.status(200).json({ message: "Users Registration SUcessfully" })
                    }
                } else {
                    return res.status(400).json({ message: "Email Already Registered" })
                }
            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
    static companyRegisteration = async (req, res) => {
        const { email, password, confirm, CompanyName, CompanyAddress, phone, intro , Status } = req.body;
        try {
            if (email, password, confirm, CompanyName, CompanyAddress, phone, intro, Status) {
                const isUser = await companyModel.findOne({ email: email });
                if (!isUser) {
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashPassword = await bcryptjs.hash(password, genSalt);

                    const newUser = new companyModel({
                        email: email,
                        password: hashPassword,
                        confirm: password,
                        CompanyName: CompanyName,
                        CompanyAddress: CompanyAddress,
                        phone: phone,
                        intro: intro,
                        Status:Status
                    })
                    const savedUser = await newUser.save()
                    if (savedUser) {
                        return res.status(200).json({ message: "Users Registration SUcessfully" })
                    }
                } else {
                    return res.status(400).json({ message: "Email Already Registered" })
                }
            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await authModel.findOne({ email: email })
                console.log(isEmail)
                if (isEmail.Status === "active") {
                    if (isEmail) {
                    if (isEmail.email === email && await bcryptjs.compare(password, isEmail.password)) {
                        const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
                            expiresIn: "2d"
                        });
                        return res.status(200).json({
                            message: "Login Sucessfully",
                            token,
                            username: isEmail.nickname,
                            type: "student",
                            Id: isEmail._id,
                            email:isEmail.email
                        });
                    } else {
                        return res.status(400).json({ message: "Wrong Credensitials" })
                    }
                } else {
                    return res.status(400).json({ message: "Email ID Not Found!!" })

                }
                } else {
                return res.status(400).json({ message: "Your Account is Disabled Contact Admin" })
                }
                
            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }

    }
   
    static companyLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await companyModel.findOne({ email: email })
                console.log()
                if (isEmail.Status === "active") {
                    if (isEmail) {
                    if (isEmail.email === email && await bcryptjs.compare(password, isEmail.password)) {
                        const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
                            expiresIn: "2d"
                        });
                        return res.status(200).json({
                            message: "Login Sucessfully",
                            token,
                            username: isEmail.CompanyName,
                            type: "company",
                            Id: isEmail._id

                        });
                    } else {
                        return res.status(400).json({ message: "Wrong Credensitials" })

                    }
                } else {
                    return res.status(400).json({ message: "Email ID Not Found!!" })

                }
                } else {
                    return res.status(400).json({ message: "Your Account is Disabled Contact Admin...!" })
                    
                }
                
            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }

    }
    static userReset = async (req, res) => {
        // const { email, newPassword, key } = req.body;
        const { email, key, newPassword } = req.body;

        // Check if the email and security key match
        const user = await authModel.findOne({ email, key });

        if (!user) {
            return res.status(401).json('Invalid email or security key');
        }

        // Hash the new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();
        res.send("sucessfully Reset The Password, Please Login !!")


    }
    static updateUserStatus = async (req, res) => {
            const { id } = req.params;
            const { status } = req.body;
          
            try {
              // Update the document in the database
              const updatedPost = await authModel.findByIdAndUpdate(
                id,
                {
                    Status: status,
                },
                { new: true }
              );
          
              if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
              }
          
              res.status(200).json(updatedPost);
            } catch (error) {
              console.error('Error updating status:', error);
              res.status(500).json({ message: 'Internal Server Error' });
            }
          ;
    }
    static updateCompanyStatus = async (req, res) => {
            const { id } = req.params;
            const { status } = req.body;
          
            try {
              // Update the document in the database
              const updatedPost = await companyModel.findByIdAndUpdate(
                id,
                {
                    Status: status,
                },
                { new: true }
              );
          
              if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
              }
          
              res.status(200).json(updatedPost);
            } catch (error) {
              console.error('Error updating status:', error);
              res.status(500).json({ message: 'Internal Server Error' });
            }
          ;
    }
    static updateStatus = async (req, res) => {
            const { id } = req.params;
            const { status } = req.body;
          
            try {
              // Update the document in the database
              const updatedPost = await JobPostModel.findByIdAndUpdate(
                id,
                {
                    Status: status,
                },
                { new: true }
              );
          
              if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
              }
          
              res.status(200).json(updatedPost);
            } catch (error) {
              console.error('Error updating status:', error);
              res.status(500).json({ message: 'Internal Server Error' });
            }
          ;
    }
    static createJobPost = async (req, res) => {
        const { title, companyName, Location, type, Salary, description, summary, Status, CompanyId } = req.body;
        // console.log(req.body)

       try {
        const Company = await companyModel.findOne({ CompanyName: companyName })
        if (Company.Status === "active") {
            try {
                    if (!title || !companyName || !Location || !type || !Salary || !summary || !description ) {
                        return res.status(400).json({ message: "All fields are required" });
                    }
        
                    const newJobPost = new JobPostModel({
                        title,
                        companyName,
                        Location,
                        type,
                        Salary,
                        summary,
                        description,
                        Status,
                        CompanyId
                    });
                    const savedJobPost = await newJobPost.save();
        
                    if (savedJobPost) {
                        return res.status(201).json({ message: "Blog post created successfully" });
                    } else {
                        return res.status(500).json({ message: "Failed to create a Job post" });
                    }
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ message: "Internal Server Error" });
                }
        } else {
            return res.status(500).json({ message: Company.CompanyName + " is Disabled"}); 
        }

        res.status(200).json(Company);
       } catch (error) {
        console.log(error)
       }
        
        
        // 
    }


    static allUsers = async (req, res) => {
        try {
            const Users = await authModel.find();
            res.status(200).json(Users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static allCompanies = async (req, res) => {
        try {
            const Companies = await companyModel.find();
            res.status(200).json(Companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static adminallPost = async (req, res) => {
       try {
        const posts = await JobPostModel.find();
        res.status(200).json(posts);
        
       } catch (error) {
        res.status(500).json({ message: error.message });
        
       }
    };
    
    static allPost = async (req, res) => {
            try {
                // Retrieve active companies
                const activeCompanies = await companyModel.find({ Status: 'active' });
        
                // Extract the IDs of active companies
                const activeCompanyIds = activeCompanies.map(company => company._id);
                console.log('Active Company IDs:', activeCompanyIds);
        
                // Retrieve active job posts for active companies
                const activeJobPosts = await JobPostModel.find({
                    Status: 'active',
                    CompanyId: { $in: activeCompanyIds }
                });
        
                res.status(200).json(activeJobPosts);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        };
        
    
    
    
    static SinglePost = async (req, res) => {
        // const { title, summary, content, author, imageURL } = req.body;
        const Jobid = req.params.Jobid;
        try {
            const JobPost = await JobPostModel.findById(Jobid);

            if (!JobPost) {
                return res.status(404).json({ message: 'Job post not found' });
            }
            await JobPost.save();
            res.status(200).json(JobPost);
        } catch (error) {
            // console.log("error with " + )
            res.status(500).json({ message: error });
        }
    }
    static ApplyJob = async (req, res) => {
        const postId = req.params.postId
        console.log(postId)
        try {
            const studentApplyName = req.body.studentApplyName;
            console.log(studentApplyName)

            // Find job post
            const post = await JobPostModel.findById(postId);

            if (post.studentApplyName.includes(studentApplyName)) {

                // Name already exists, return error
                return res.status(400).json({ error: 'You have already applied' });

            } else {

                // Name not found, proceed with push  
                await JobPostModel.findByIdAndUpdate(
                    postId,
                    {
                        $push: { studentApplyName: studentApplyName }
                    }
                );

                return res.status(200).json({ message: 'Application submitted' });

            }

            if (!updatePost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json(updatePost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static updateCompany = async (req, res) => {
        try {
            const Id = req.params.userId; // Assuming 'Id' is the parameter in your route
            const updatedCompanyName = req.body.CompanyName;
            const updatedCompanyAddress = req.body.CompanyAddress;
            const updatedphone = req.body.phone;
            const updatedintro = req.body.intro;
            console.log(req.params)

            const updatedProfile = await companyModel.findByIdAndUpdate(
                Id,
                {
                    CompanyName: updatedCompanyName,
                    CompanyAddress: updatedCompanyAddress,
                    phone: updatedphone,
                    intro: updatedintro,
                },
                { new: true } // Include this option if you want to return the updated document
            );

            if (!updatedProfile) {
                return res.status(404).json({ message: 'Company not found' });
            }

            res.status(200).json(updatedProfile);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static updateProfile = async (req, res) => {
        try {
            const Id = req.params.userId; // Assuming 'Id' is the parameter in your route
            const updatednickname = req.body.nickname;
            const updatedphone = req.body.phone;
            const updatedresidence = req.body.residence;
            console.log(req.params)

            const updatedProfile = await authModel.findByIdAndUpdate(
                Id,
                {
                    nickname: updatednickname,
                    phone: updatedphone,
                    residence: updatedresidence,
                },
                { new: true } // Include this option if you want to return the updated document
            );

            if (!updatedProfile) {
                return res.status(404).json({ message: 'Company not found' });
            }

            res.status(200).json(updatedProfile);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static updatePost = async (req, res) => {
        try {
            const postId = req.params.postId;

            const updatedTitle = req.body.title;
            const updatedLocation = req.body.Location;
            const updatedSalary = req.body.Salary;
            const updatedDescription = req.body.description;
            const updatedSummary = req.body.summary;
            console.log(req.body.Location)

            const updatedPost = await JobPostModel.findByIdAndUpdate(
                postId,
                {
                    title: updatedTitle,
                    Location: updatedLocation,
                    Salary: updatedSalary,
                    description: updatedDescription,
                    summary: updatedSummary
                },
                { new: true } // Include this option if you want to return the updated document
            );

            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static deletePost = async (req, res) => {
        
        try {
        const postId= req.params.postId
            const post = await JobPostModel.findByIdAndDelete(postId);
            res.status(200).json(post);
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static companyProfile = async (req, res) => {
        // const { title, summary, content, author, imageURL } = req.body;
        const username = req.params.userId
        try {
            const isUser = await companyModel.findOne({ _id: username })
            res.status(200).json(isUser);
            console.log(isUser)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static userProfile = async (req, res) => {
        const username = req.params.userId
        console.log(req.params.userId)
        try {
            const isUser = await authModel.findOne({ _id: username })
            res.status(200).json(isUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static CompanyPosts = async (req, res) => {
        const username = req.params.userId
        console.log(username)
        try {
            const CompanyJobs = await JobPostModel.find({ companyName: username })
            res.status(200).json(CompanyJobs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static DisplayCompanyPosts = async (req, res) => {
        const username = req.params.userId
        console.log(username)
        try {
            const CompanyJobs = await JobPostModel.find({ companyName: username })
            res.status(200).json(CompanyJobs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static PublicCompany = async (req, res)=>{
        try {
            const id = req.params.userId;
            const CompanyJobs = await companyModel.findOne({ CompanyName: id })
            res.status(200).json(CompanyJobs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default AuthController