const cookieParser = require("cookie-parser")
const express= require("express")
const cors=require("cors")
let path=require("path")



const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.static("./public"))

/** require route */
const AuthRouter=require("./routes/Auth.route")
const { Songrouter } = require("./routes/Song.route")


/**
 * use of routes
 */

app.use("/api/web",AuthRouter)
app.use("/api/songs",Songrouter)
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,".","../public/index.html"))
})


module.exports =app