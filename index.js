const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
async function main(){
  await mongoose.connect("mongodb+srv://developers:BhurhfFPyknKIGs5@cluster0.h8dfu4o.mongodb.net/Learnexa-app");
  app.listen(3000, () => {
  console.log('Server is running on port 3000');
  });  
}

main();