import mongoose from "mongoose"
import { config } from "./config.js";

async function  ConnectDb(){
     await mongoose.connect(config.MONGODB_URI)
     .catch((err)=>{
          console.log("MongoDB err",err);
     })

     console.log("Database is Connected")

}

export default ConnectDb