import jwt from "jsonwebtoken"
import BlackListModel from "../models/Blacklist.models.js"
import { config } from "../config/config.js"


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
        const encrypted=jwt.verify(token,config.JWT_SECRET)
      
        req.user=encrypted
        console.log(req.user);
        
        next()
      
     }
     catch(err){
           return res.status(500).json({
            message:`internal Server Error ${err.message}`
           })
     }

    
    
}


