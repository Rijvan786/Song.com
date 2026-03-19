const mongoose=require("mongoose")

async function  ConnectDb(){
     await mongoose.connect(process.env.MONGO_URI)
     .catch((err)=>{
          console.log("MongoDB err",err);
     })

     console.log("Database is Connected")

}

module.exports=ConnectDb