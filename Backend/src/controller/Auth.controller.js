const jwt=require("jsonwebtoken");
const Authmodel = require("../models/Auth.model");
const bcrypt=require("bcryptjs");
const Blacklistmodel = require("../models/Blacklist.models");
const redis = require("../config/cashe");
                                                                                                                                                                          

const Register=async(req,res)=>{
    const {username,email,password}=req.body;
    
    const isAllreaadyRegister=await Authmodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isAllreaadyRegister){
        return res.status(409).json({
            message:"User"+" "+(isAllreaadyRegister.email=email?"email is already register":"is already register")
        })
    }

    const user=await Authmodel.create({
        username,
        email,
        password:await bcrypt.hash(password,10)
    })
    const token=jwt.sign({
         id:user._id,
         username:user.username,
         email:user.email
    },
    process.env.JWT_SECRET,{expiresIn:"3d"}
)

    res.cookie("token",token)

    res.status(200).json({
        message:"User is registered successfully",
        username:user.username,
        email:user.email,
        password:user.password
    })
}
const Login=async(req,res)=>{
    const {username,email,password}=req.body;
     const user=await Authmodel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
     })
     if(!user){
        return res.status(400).json({
            message:"Invalid credetials",
        })
     }
     const validuser=await bcrypt.compare(password,user.password)
     if(!validuser){
        return res.status(400).json({
            message:"User bad request"
        })
     }
     let token=jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email
     },
     process.env.JWT_SECRET,{expiresIn:"3d"}

    )
    res.cookie("token",token)

    res.status(200).json({
        message:"User is LoggedIn Successfully",
        username:user.username,
        email:user.email,
        password:user.password
    })


}
const getme=async(req,res)=>{
    
    const user=await Authmodel.findById(req.user.id)
    res.status(200).json({
        message:"user is get successfully",
        user
    })

}

const logout=async(req,res)=>{
    const token=req.cookies.token
    console.log(token);
    res.clearCookie("token")
    await BlacklistModel.create({token:token})


    res.status(200).json({
        message:"Logout succeessfully"
    })
}
module.exports={Register,Login,getme,logout}
