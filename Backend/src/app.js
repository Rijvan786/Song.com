const cookieParser = require("cookie-parser")
const express= require("express")
const cors=require("cors")




const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


/** require route */
const AuthRouter=require("./routes/Auth.route")
const { Songrouter } = require("./routes/Song.route")


/**
 * use of routes
 */

app.use("/api/web",AuthRouter)
app.use("/api/songs",Songrouter)

module.exports =app