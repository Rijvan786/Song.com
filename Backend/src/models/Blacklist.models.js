const mongoose=require("mongoose")

const Blacklistschema=new mongoose.Schema({
    token:{
        type:String,
        createdAt: { type: Date, default: Date.now, expires: 3600 },
        required:[true,"Required for creating account"]
    }
},
{
    timestamps:true
}
)

const Blacklistmodel=mongoose.model("blacklist",Blacklistschema)
module.exports =Blacklistmodel
