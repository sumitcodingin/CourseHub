const {Router} = require('express');
const courseRouter = Router();
courseRouter.post("purchase", (req, res) => {
  // Handle course purchase logic here
  res.send("Course purchased successfully");
});
courseRouter.get("/preview", (req, res) => {
  // Handle course preview logic here
  res.send("Course preview available");
});
module.exports={
    courseRouter: courseRouter
}