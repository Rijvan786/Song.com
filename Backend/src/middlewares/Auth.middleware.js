const jwt=require("jsonwebtoken")
const Blacklistmodel = require("../models/Blacklist.models")
const redis = require("../config/cashe")


const Identifire=async(req,res,next)=>{
    const token=req.cookies.token

    if(!token){
        return res.status(404).json({
            message:"token is not provided"
        })
    }
    const blacklist=await redis.get(token)
   if(blacklist){
    return res.status(401).json({
        message:"Token is blacklisted"
    })
   }
     try{
        const incrypted=jwt.verify(token,process.env.JWT_SECRET)

        req.user=incrypted
        next()
     }
     catch(err){
           return res.status(401).json({
            message:"User is unauthorized"
           })
     }

    
    
}

module.exports=Identifire