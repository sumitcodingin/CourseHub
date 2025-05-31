const { Router }=require('express');
const userRouter = Router();
userRouter.post("/signup", (req, res) => {
  // Handle user signup logic here
  res.send("User signed up successfully");
});
userRouter.post("/login", (req, res) => {
  // Handle user login logic here
  res.send("User logged in successfully");
});
userRouter.get("/purchase", (req, res) => {
  // Handle user purchases logic here
  res.send("User's purchases");
});
module.exports={
    userRouter:userRouter
}