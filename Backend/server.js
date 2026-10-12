/** 
 * Server connected karna and database connecte karna 
 * 
 */
import  app from "./src/app.js" 
import  ConnectDB from  "./src/config/database.js" 


app.listen(3000,()=>{
    console.log("server is connected");
})

ConnectDB()