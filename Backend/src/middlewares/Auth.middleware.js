import jwt from "jsonwebtoken"
import BlackListModel from "../models/Blacklist.models.js"


export const Identifire=async(req,res,next)=>{
    const token=req.cookies.token

    if(!token){
        return res.status(404).json({
            message:"token is not provided"
        })
    }
    const blacklist=await BlackListModel.findOne({
   token: token
    })
   if(blacklist){
    return res.status(401).json({
        message:"Token is blacklisted"
    })
   }
     try{
        const incrypted=jwt.verify(token,process.env.JWT_SECRET)
      console.log(req.user,"Identifire");
        req.user=incrypted
        next()
     }
     catch(err){
           return res.status(401).json({
            message:"User is unauthorized"
           })
     }

    
    
}


