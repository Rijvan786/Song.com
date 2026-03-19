/** 
 * Server connected karna and database connecte karna 
 * 
 */
require("dotenv").config()
const app=require("./src/app")
const ConnectDB=require("./src/config/database")

app.listen(3000,()=>{
    console.log("server is connected");
})

ConnectDB()