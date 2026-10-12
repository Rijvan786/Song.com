import { createContext, useState } from "react";

export const Songcontext=createContext()

export const SongProvider= ({children})=>{
       const [Song, setSong] = useState({
 
     "title": "High On Me (RiskyjaTT.CoM)",
        "url": "https://ik.imagekit.io/Rizwan786/moodify/songs/High_On_Me__RiskyjaTT.CoM__Qaug-HYIV.mp3",
        "posturl": "https://ik.imagekit.io/Rizwan786/moodify/posters/High_On_Me__RiskyjaTT.CoM___n_-BeTcZ.jpeg",
        "mood": "Neutral",
})
       const [Loading, setLoading] = useState(false)

       return (
        <Songcontext.Provider value={{Song,setSong,Loading,setLoading}}>
       {children}
        </Songcontext.Provider>
       )
}