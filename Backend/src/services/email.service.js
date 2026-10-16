// import Nodemailer from "nodemailer";
// import {config} from "../config/config.js";

// const transporter = Nodemailer.createTransport({
//     service: 'gmail',
//     family:4,
//     auth:{
//       type:'OAuth2',
//       user:config.EMAIL_USER,
//       clientId:config.GOOGLE_CLIENT_ID,
//       clientSecret:config.GOOGLE_CLIENT_SECRET,
//       refreshToken:config.GOOGLE_REFRESH_TOKEN,
//       pass:config.EMAIL_PASS
//  }
// })

// console.log(config.GOOGLE_CLIENT_ID,config.GOOGLE_CLIENT_SECRET,config.GOOGLE_REFRESH_TOKEN);

// transporter.verify().then(()=>{
//     console.log("Transporter is Ready to send Mail");
// }).catch((err)=>{
//     console.log("Error occur in Email Transporter",err)
// })


// export async function SendMail({to,subject,text="",html}) {
//     const mailOption={
//         from:config.EMAIL_USER,
//         to,
//         subject,
//         text,
//         html
//     }
//     const details=await transporter.sendMail(mailOption)
//     console.log(details);
    
// }


import emailjs from "@emailjs/nodejs"
import { config } from "../config/config.js"



export async function SendMailDynamic({
    subject,email,html

}){

    const templateParams ={
        subject_line:subject,
        to_email:email,
        dynamic_html_content:html  
    }
    await emailjs.send(
        config.EMAILJS_SERVICE_ID,  
        config.EMAILJS_TEMPLATE_ID,     
        templateParams,
        {
            publicKey:config.EMAILJS_PUBLIC_KEY,
            privateKey:config.EMAILJS_PRIVATE_KEY
            
        }
        
    ).then((res)=>{
        console.log("Successfully sent email",res.status,res.text)
})
    .catch( (error)=>{
        console.log(`Sending mail Error occurred ${error.message}`);
    })
console.log( config.EMAILJS_SERVICE_ID,
        config.EMAILJS_TEMPLATE_ID,  )
}