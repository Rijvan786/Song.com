import {Router} from "express"
const AuthRouter =  Router()
import {
      EmailVerificationController,
      ForgetPasswordController,
      ForgetPasswordMail,
      getMeController,
      GoogleCallback,
      LoginController,
      logoutController,
      RegisterController, 
      ResendMailController
    } from  "../controller/Auth.controller.js" 
import{ Identifire}  from  "../middlewares/Auth.middleware.js" 
import { RegisterValidator } from "../validator/auth.validator.js"
import passport from "passport"
import { config } from "../config/config.js"

/**
 * Register 
 * /api/web/register
 */
AuthRouter.post("/register",RegisterValidator, RegisterController)





AuthRouter.get("/google",passport.authenticate("google",{scope:["profile","email"]}))



AuthRouter.get("/google/callback",
  passport.authenticate("google",{session:false,failureRedirect:config.NODE_ENV==="production"?"https://songcom-production.up.railway.app":"http://localhost:5173"})
,GoogleCallback)







/**
 * Email-Verification
 * /api/web/Email-verify
 */

AuthRouter.get("/Email-Verification",Identifire,EmailVerificationController)



/** 
 *  Resend-Email
 * /api/web/Resend-mail
 * 
 */

AuthRouter.post("/Resend-mail",ResendMailController)


/** 
 *  ForgetPassword-Mail
 * /api/web/ForgetPassword-Mail
 * 
 */
AuthRouter.post("/ForgetPassword-mail",ForgetPasswordMail)



AuthRouter.patch("/ForgetPassword",ForgetPasswordController)
/**
 * Login ,
 * /api/web/login
 */

AuthRouter.post("/login",LoginController)


/**
 * getme 
 * /api/web/getme
 */
AuthRouter.get("/getme",Identifire,getMeController)

/** Logout
 * /api/web/logout
 */

AuthRouter.get("/logout",logoutController)






export default AuthRouter