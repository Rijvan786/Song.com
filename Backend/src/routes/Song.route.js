const {Router}=require("express")

const Songrouter=Router()

const SongController=require("../controller/Song.controller")
const upload = require("../middlewares/upload.middleware")


/**
 * Upload song
 * /api/song/
 */


Songrouter.post("/",upload.single("song"),SongController.uploadSongController)


// Songrouter.get
/**
 * /api/song?mood=currentmood
 */
Songrouter.get("/",SongController.getSong)

module.exports={Songrouter}