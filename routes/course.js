const {Router} = require('express');
const { userMiddleware } = require('../middleware/user');
const courseRouter = Router();
const {purchaseModel, courseModel} = require('../db');
courseRouter.post("purchase",userMiddleware, async(req, res) => {
  const userId = req.userId; // Assuming userId is set by userMiddleware
  const courseId = req.body.courseId;
  // Handle course purchase logic here
   const purchase=await purchaseModel.create({
    userId,
    courseId
  })
   res.status(201).json({
    message: "Course purchased successfully",
    
  });
});
courseRouter.get("/preview", async(req, res) => {
  // Handle course preview logic here
  const courses= await courseModel.find({})
   res.status(201).json({
    message: "Course available for preview",
    courses
   });
  
});
module.exports={
    courseRouter: courseRouter
}