import {createSlice }from "@reduxjs/toolkit"


const songSlice=createSlice({
    name:"Song",
     initialState:{
        song:{
       "title": "High On Me (Risky-jaTT.CoM)",
        "url": "https://ik.imagekit.io/Rizwan786/moodify/songs/High_On_Me__RiskyjaTT.CoM__Qaug-HYIV.mp3",
        "posturl": "https://ik.imagekit.io/Rizwan786/moodify/posters/High_On_Me__RiskyjaTT.CoM___n_-BeTcZ.jpeg",
        "mood": "Neutral"},
       
       
    },

     reducers:{
        setSong:(state,action)=>{
            state.song=action.payload
         },
       
     }
})

export const { setSong} =songSlice.actions

export default songSlice.reducer