import {createSlice }from "@reduxjs/toolkit"


const songSlice=createSlice({
    name:"Song",
     initialState:{
        song:{
       "title": "High On Me (Risky-jaTT.CoM)",
        "url": "https://ik.imagekit.io/Rizwan786/moodify/songs/6_Am__RiskyjaTT.CoM__qi-VaMXq8.mp3",
        "posturl": "https://ik.imagekit.io/Rizwan786/moodify/posters/6_Am__RiskyjaTT.CoM__gDvKJ8izp.jpeg",
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