// const jwt=require("jsonwebtoken")
const songmodel = require("../models/Song.model")
const storage=require("../services/storage.services")
const id3=require("node-id3")


const uploadSongController=async(req,res)=>{
    const {mood}=req.body;
    const songbuffer=req.file.buffer
    const tags= id3.read(req.file.buffer)
    console.log(tags);
  
    const [songfile, posterfile] = await Promise.all([
        storage.uploadfile({
            buffer: songbuffer,
            filename: tags.title + ".mp3",
            folder: "/moodify/songs"
        }),
        storage.uploadfile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/moodify/posters"
        })
    ])

     const  song=await songmodel.create({
        title:tags.title,
        url:songfile.url,
        posturl:posterfile.url,
        mood
      })
res.status(201).json({
    message:"Song created successfully",
    song
})
}

const getSong=async (req,res)=>{
    const {mood}=req.query

    const song=await songmodel.findOne({
        mood
    })
    res.status(200).json({
        message:"Song fetched by mood successfully",
       song
    })
}


 module.exports =  {uploadSongController,getSong}