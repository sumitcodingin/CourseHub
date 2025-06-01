const {Router} = require('express');
const adminRouter = Router();
const {adminModel} = require('../db');
const {courseModel} = require('../db');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt=require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD} = require('../config');
const { adminMiddleware } = require('../middleware/admin');

//bcrypt zod jsonwebtoken
adminRouter.post("/signup",async (req, res) => {
  const adminSchema=z.object({
        email:z.string().email(),
        password:z.string().min(8).max(20).regex(/[A-Z]/,"Password must contain at least one uppercase letter")
        .regex(/[a-z]/,"Password must contain at least one lowercase letter")
        .regex(/[0-9]/,"Password must contain at least one number")
        .regex(/[@$!%*?&]/,"Password must contain at least one special character"),
        firstName:z.string().min(1).max(50),
        lastName:z.string().min(1).max(50),
        
    })
    const parsedDatawithsuccess=adminSchema.safeParse(req.body);
    if(!parsedDatawithsuccess.success){
        res.status(400).json({
            message:"Invalid data",
            // errors: parsedDatawithsuccess.error.issues,    
            // errors:parsedDatawithsuccess.error.issues.map(issue=>issue.message)
        })
        return;
    }
  const { email, password, firstName, lastName } = req.body;
  let errorThrown = false;
  try{
    const hashedPassword =await  bcrypt.hash(password, 10);
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    
  }catch(e){
    errorThrown = true;
    if (e.code === 11000) {
      res.status(400).json({
        message: "Email already exists",
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  if (!errorThrown) {
    res.status(201).json({
      message: "Admin signed up successfully",
    });
  }





  
  
});
adminRouter.post("/login",async (req, res) => {
  const {email,password} = req.body;
  try{
    const response=await adminModel.findOne({
    email:email
  })
  if(!response){
    return res.status(400).json({
      message:"Invalid email or password"
    });
  }
  const ispasswordValid=await bcrypt.compare(password,response.password)
  if(!ispasswordValid){
    return res.status(400).json({
      message:"Invalid email or password"
    });
  }
  const token=jwt.sign({
    adminId:response._id
    }, JWT_ADMIN_PASSWORD)
  res.status(200).json({
    message:"Admin logged in successfully",
    token:token
    
  
   });

  }catch(e){
    res.status(500).json({
      message:"Internal server error"
    });
  }
  
});
adminRouter.post("/course",adminMiddleware, async(req, res) => {
  const adminId = req.adminId; // Assuming userId is set by adminMiddleware
  const { title, description, price, imageUrl } = req.body;
  const course=await courseModel.create({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    creatorId: adminId,
  })
  res.status(201).json({
    message: "Course added successfully",
    courseId: course._id,
  });
  
});
adminRouter.put("/course",adminMiddleware,async (req, res) => {
 const adminId = req.adminId; // Assuming userId is set by adminMiddleware
  const { title, description, price, imageUrl ,courseId } = req.body;
  const course=await courseModel.findOne({
    _id: courseId,
    creatorId: adminId, // Ensure the course belongs to the admin
    
   
   
 })
 if(!course){
   return res.status(400).json({
     message:"Invalid courseId"
   })
 }

  const courseupdate=await courseModel.updateOne({
    _id: courseId,
    creatorId: adminId, // Ensure the course belongs to the admin
    },{
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    creatorId: adminId,
  })
  res.status(201).json({
    message: "Course updated successfully",
    courseId: courseupdate._id,
  });
});
adminRouter.get("/course/preview",adminMiddleware, async(req, res) => {
   const adminId = req.adminId; // Assuming userId is set by adminMiddleware
   const courseget=await courseModel.find({
    creatorId: adminId,
    // Ensure the course belongs to the admin
    })
  res.status(201).json({
    message: "Course available for preview",
    courseget
  });
});
module.exports = {
    adminRouter: adminRouter
}