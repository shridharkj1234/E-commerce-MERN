const jwt=require('jsonwebtoken');
const User=require('../model/userModel');
const asyncHandler=require('express-async-handler');
const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];

            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            req.user=await User.findById(decoded.id).select('-password');
            next();
        }catch(e){
            
            res.status(401);    
            throw new Error('Not Authorised Token Failed');
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
      }
    // next();
})

const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not Authorised as you are not Admin')
    }
}

module.exports={protect,admin};
