const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId=schema.objectId

const userSchema=new schema({
    email:{type:String , required:true, unique:true},
    password:"string",
    firstName:"string",
    lastName:"string",
    
})
const adminSchema=new schema({
    email:{type:String , required:true, unique:true},
    password:"string",
    firstName:"string",
    lastName:"string",
    
})
const courseSchema=new schema({
    title:"string",
    description:"string",
    price:"number",
    imageUrl:"string",
    creatorId:"objectId",
})
const purchaseSchema=new schema({
    
    courseId:"objectId",
    userId:"objectId",
})
const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);
module.exports={
    userModel,
    adminModel,
    courseModel,    
    purchaseModel
}