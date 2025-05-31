const {Router} = require('express');
const adminRouter = Router();
const {adminModel} = require('../db');
//bcrypt zod jsonwebtoken
adminRouter.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;



  // Handle user signup logic here
  res.send("admin signed up successfully");
});
adminRouter.post("/login", (req, res) => {
  // Handle user login logic here
  res.send("admin logged in successfully");
});
adminRouter.post("/", (req, res) => {
  // Handle adding a new course logic here
  res.send("Course added successfully");
});
adminRouter.put("/", (req, res) => {
  // Handle adding a new course logic here
  res.send("Course added successfully");
});
adminRouter.get("/preview", (req, res) => {
  // Handle adding a new course logic here
  res.send("course present here ");
});
module.exports = {
    adminRouter: adminRouter
}