import dotenv from "dotenv"

dotenv.config()




const {MONGODB_URI, PORT,NODE_ENV,CLIENT_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS,EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,EMAILJS_PUBLIC_KEY,EMAILJS_PRIVATE_KEY,IMAGE_KIT_PRIVATE_KEY,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_REFRESH_TOKEN,GOOGLE_CLIENT_ID2,GOOGLE_CLIENT_SECRET2} = process.env;

console.log(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID)
if(!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

if(!PORT) {
    throw new Error("PORT is not defined in the environment variables");
}

if(!NODE_ENV) {
    throw new Error("NODE_ENV is not defined in the environment variables");
}
if(!CLIENT_URL){
    throw new Error ("CLIENT_URL is not defined in the environment variables")
}
if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

if(!EMAIL_USER) {
    throw new Error("EMAIL_USER is not defined in the environment variables");
}

if(!EMAIL_PASS) {
    throw new Error("EMAIL_PASS is not defined in the environment variables");
} 
if(!EMAILJS_SERVICE_ID) {
    throw new Error("EMAILJS_SERVICE_ID is not defined in the environment variables");
} 

if(!EMAILJS_TEMPLATE_ID) {
    throw new Error("EMAILJS_TEMPLATE_ID is not defined in the environment variables");
} 
if(!EMAILJS_PUBLIC_KEY) {
    throw new Error("EMAILJS_PUBLIC_KEY is not defined in the environment variables");
} 
if(!EMAILJS_PRIVATE_KEY) {
    throw new Error("EMAILJS_PRIVATE_KEY is not defined in the environment variables");
} 
if(!IMAGE_KIT_PRIVATE_KEY) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in the environment variables");
}

if(!GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not defined in the environment variables");
}

if(!GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in the environment variables");
}


if(!GOOGLE_REFRESH_TOKEN){
    throw new Error("GOOGLE_REFRESH_TOKEN is not defined in the environment variables");
}

if(!GOOGLE_CLIENT_ID2) {
    throw new Error("GOOGLE_CLIENT_ID2 is not defined in the environment variables");
}

if(!GOOGLE_CLIENT_SECRET2){
    throw new Error("GOOGLE_CLIENT_SECRET2 is not defined in the environment variables");
}


export const  config = {
    MONGODB_URI:MONGODB_URI,
    PORT:PORT,
    EMAILJS_SERVICE_ID:EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID:EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY:EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY:EMAILJS_PRIVATE_KEY,
    NODE_ENV:NODE_ENV,
    CLIENT_URL:CLIENT_URL,
    JWT_SECRET:JWT_SECRET,
    EMAIL_USER:EMAIL_USER,
    EMAIL_PASS:EMAIL_PASS,
    IMAGE_KIT_PRIVATE_KEY:IMAGE_KIT_PRIVATE_KEY,
    GOOGLE_CLIENT_ID:GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN:GOOGLE_REFRESH_TOKEN,
    GOOGLE_CLIENT_ID2:GOOGLE_CLIENT_ID2,
    GOOGLE_CLIENT_SECRET2:GOOGLE_CLIENT_SECRET2

} 