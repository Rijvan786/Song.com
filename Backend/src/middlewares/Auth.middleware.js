import jwt from "jsonwebtoken"
import BlackListModel from "../models/Blacklist.models.js"
import { config } from "dotenv"


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
        const incrypted=jwt.verify(token,config.JWT_SECRET)
   
        req.user=incrypted
        
        next()
     console.log(req.user);
     }
     catch(err){
           return res.status(500).json({
            message:`internal Server Error ${err.message}`
           })
     }

    
    
}


