import cookieParser  from "cookie-parser"
import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import passport from "passport"




const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

const app=express()

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true    
}))

app.use(express.static("./public"))




/** require route */
import AuthRouter from "./routes/Auth.route.js"
import Songrouter   from "./routes/Song.route.js"
import { config } from "./config/config.js"
import { profile } from "console"



/**
 * use of routes
 */

app.use("/api/web",AuthRouter)
app.use("/api/songs",Songrouter)


/**Google Auth  */

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID2,
    clientSecret:config.GOOGLE_CLIENT_SECRET2,
    callbackURL:"/api/web/google/callback"
},(_,__,profile,done)=>{
    return done(null,profile)
}))

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,".","../public/index.html"))
})








export default app