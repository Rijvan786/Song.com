const {Router}=require("express")

const AuthRouter=Router()
const AuthController=require("../controller/Auth.controller")
const Identifire = require("../middlewares/Auth.middleware")

/**
 * Register 
 * /api/web/register
 */
AuthRouter.post("/register",AuthController.Register)

/**
 * Login ,
 * /api/web/login
 */

AuthRouter.post("/login",AuthController.Login)


/**
 * getme 
 * /api/web/getme
 */
AuthRouter.get("/getme",Identifire,AuthController.getme)

/** Logout
 * /api/web/logout
 */

AuthRouter.get("/logout",AuthController.logout)






module.exports=AuthRouter