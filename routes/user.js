const { Router }=require('express');
const {userModel} = require('../db');
const userRouter = Router();
const {z} = require('zod');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require('../config');
const { userMiddleware } = require('../middleware/user');
const { purchaseModel } = require('../db');


userRouter.post("/signup", async(req, res) => {
  const {email, password, firstName, lastName} = req.body;
  const userSchema= z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20).regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    
  })
  const parsedData = userSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error.issues.map(issue => issue.message)
    });
  }
  let errorThrown = false;
  try{
    const hashedPassword =await  bcrypt.hash(password, 10);
    await userModel.create({
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
      message: "User signed up successfully",
    });
  }
});
  


  

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try{
    const response=await userModel.findOne({
       email:email
  })
  if(!response){
    return res.status(400).json({
      message: "email does not exist",
    });
  }
  const ispasswordValid = await bcrypt.compare(password, response.password);
  if(!ispasswordValid){
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  const token=jwt.sign({
    userId:response._id
  }, JWT_USER_PASSWORD)
  res.status(200).json({
    message: "User logged in successfully",    
    token:token
  });
  
  

  }catch(e){
    
    
    res.status(500).json({
      message: "Internal server error",
    });
  }
  
  
  


 
  
});
userRouter.get("/purchase",userMiddleware, async(req, res) => {
  // Handle user purchases logic here
  const userId = req.userId; // Assuming userId is set by userMiddleware
   const purchases = await purchaseModel.find({
    userId
   });
   const courseData = await courseModel.find({
    _id:{$in:purchases.map(purchase => purchase.courseId)}
   })
   res.status(201).json({
    message: "User purchases",
    purchases
   });

 
});
module.exports={
    userRouter:userRouter
}