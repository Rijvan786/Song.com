import Imagekit  from "@imagekit/nodejs"

import {toFile} from "@imagekit/nodejs"

import {config} from "../config/config.js"




const imagekit=new Imagekit({
    privateKey:config.IMAGE_KIT_PRIVATE_KEY
})

export const uploadfile=async({buffer,filename,folder=""})=>{
    const file=await imagekit.files.upload({
    file:await Imagekit.toFile(Buffer.from(buffer)),
    fileName:filename,
    folder:folder 
    })
    return  file
}

