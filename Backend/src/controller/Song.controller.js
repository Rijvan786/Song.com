// const jwt=require("jsonwebtoken")
import songmodel   from "../models/Song.model.js"
import id3 from "node-id3"
import { uploadfile } from "../services/storage.services.js";
uploadfile



export const uploadSongController=async(req,res)=>{
    const {mood}=req.body;
    const songbuffer=req.file.buffer
    const tags= id3.read(req.file.buffer)
    console.log(tags,"lo");
  
    const [songfile, posterfile] = await Promise.all([
        uploadfile({
            buffer: songbuffer,
            filename: tags.title + ".mp3",
            folder: "/moodify/songs"
        }),
        uploadfile({
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

export const getSong=async (req,res)=>{
    const {mood}=req.query

    const song=await songmodel.findOne({
        mood
    })
    console.log(song);
    res.status(200).json({
        message:"Song fetched by mood successfully",
       song
    })
}
