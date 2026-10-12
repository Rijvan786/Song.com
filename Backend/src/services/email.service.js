import Nodemailer from "nodemailer";
import {config} from "../config/config.js";

const transporter = Nodemailer.createTransport({
    service: 'gmail',
    family:4,
    auth:{
      type:'OAuth2',
      user:config.EMAIL_USER,
      clientId:config.GOOGLE_CLIENT_ID,
      clientSecret:config.GOOGLE_CLIENT_SECRET,
      refreshToken:config.GOOGLE_REFRESH_TOKEN,
      pass:config.EMAIL_PASS
 }
})

console.log(config.GOOGLE_CLIENT_ID,config.GOOGLE_CLIENT_SECRET,config.GOOGLE_REFRESH_TOKEN);

transporter.verify().then(()=>{
    console.log("Transporter is Ready to send Mail");
}).catch((err)=>{
    console.log("Error occur in Email Transporter",err)
})


export async function SendMail({to,subject,text="",html}) {
    const mailOption={
        from:config.EMAIL_USER,
        to,
        subject,
        text,
        html
    }
    const details=await transporter.sendMail(mailOption)
    console.log(details);
    
}