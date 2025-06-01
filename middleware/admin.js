const jwt = require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD } = require('../config');
function adminMiddleware(req,res,next){
    const token=req.headers.authorization;
    const decodedToken=jwt.verify(token,JWT_ADMIN_PASSWORD);
    if(!decodedToken){
        return res.status(401).json({
            message:"Unauthorized access"
        });
    }
    req.adminId=decodedToken.adminId;
    next();

} 
module.exports = {
    adminMiddleware: adminMiddleware
}