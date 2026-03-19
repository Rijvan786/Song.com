const mongoose=require("mongoose")

const songSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Fort creating a song"]
    },
    url:{
        type:String,
        required:[true," required For creating a  songs"]
    },
    posturl:{
        
        type:String,
        required:[true," required For  creating a webside post"]
    },
    mood:{
    type:String,
    enum:{
        values:["Sad","Happy","Serprised"],
        message:"IT is enum values"
    }
    }
})

const songmodel=mongoose.model("Songmodel",songSchema)
module.exports= songmodel