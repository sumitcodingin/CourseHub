const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');
function userMiddleware(req,res,next){
    const token=req.headers.authorization;
    const decodedToken=jwt.verify(token,JWT_USER_PASSWORD);
    if(!decodedToken){
        return res.status(401).json({
            message:"Unauthorized access"
        });
    }
    req.userId=decodedToken.userId;
    next();

} 
module.exports = {
    userMiddleware: userMiddleware
}