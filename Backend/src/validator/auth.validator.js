import {validationResult,body} from "express-validator"

async function Validate(req,res,next){
    const error =await validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({

            message:error.array()
        })
    }
    next()
}

export const RegisterValidator=[
    body("username").notEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").matches(/^(?=.*\d)(?=.*[@$%*?&#]).{8,}$/).withMessage("Password must be at least 8  character and include one special character and one number"),
    Validate
]