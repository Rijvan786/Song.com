import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const AuthSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"It is already register"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"It is already register user"],
        required:[true,"It is required for creating a account"]
    },
    password:{
        type:String,
        select:false,
         required: function (){
            return !this.googleId
         }
    },
    googleId:{
        type:String,
    },
    verified:{
        type:Boolean,
        default:false
    },
    lastVerificationEmailSent:{
     type:Date,
     default:null
    },
    VerificationEmailResendEmailCount:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

AuthSchema.pre("save",async function(){
           
    if(!this.isModified("password"))return ;
    const hash = await bcrypt.hash(this.password,10)
    this.password=hash
       
})

AuthSchema.methods.comparePassword= async function(password){

    return await bcrypt.compare(password,this.password)
}



const Authmodel=mongoose.model("Authmodel",AuthSchema)


export default  Authmodel