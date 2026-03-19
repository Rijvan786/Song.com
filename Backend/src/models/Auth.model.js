const mongoose=require("mongoose")

const AuthSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"It is already register"],
        required:[true,"It is required creating a account"]
    },
    email:{
        type:String,
        unique:[true,"It is already register user"],
        required:[true,"It is required for creating a account"]
    },
    password:{
        type:String,
         required:[true,"It is required for creating account"]
    }
})

AuthSchema.pre("save",function(next){
           console.log(this.username);

           
           
})



const Authmodel=mongoose.model("Authmodel",AuthSchema)


module.exports=Authmodel