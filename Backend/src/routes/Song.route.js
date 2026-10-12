import  {Router} from "express"

const Songrouter=Router()

import  {upload} from  "../middlewares/upload.middleware.js"
import { getSong, uploadSongController } from "../controller/Song.controller.js"

/**
 * Upload song
 * /api/song/
 */


Songrouter.post("/",upload.single("song"),uploadSongController)


// Songrouter.get
/**
 * /api/song?mood=currentmood
 */
Songrouter.get("/",getSong)

export default  Songrouter 