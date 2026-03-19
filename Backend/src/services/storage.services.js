const Imagekit =require("@imagekit/nodejs").default

const {toFile}=require("@imagekit/nodejs")


const imagekit=new Imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

const uploadfile=async({buffer,filename,folder=""})=>{
    const file=await imagekit.files.upload({
    file:await Imagekit.toFile(Buffer.from(buffer)),
    fileName:filename,
    folder:folder 
    })
    return  file
}

module.exports={uploadfile}