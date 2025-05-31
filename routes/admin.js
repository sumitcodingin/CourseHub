const {Router} = require('express');
const adminRouter = Router();
const {adminModel} = require('../db');
adminRouter.post("/signup", (req, res) => {
  // Handle user signup logic here
  res.send("User signed up successfully");
});
adminRouter.post("/login", (req, res) => {
  // Handle user login logic here
  res.send("User logged in successfully");
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