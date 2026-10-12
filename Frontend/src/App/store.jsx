import {configureStore} from "@reduxjs/toolkit"
import  AuthSlice from "../features/auth/states/auth.slice.jsx"
import  songSlice from "../features/Home/states/song.slice.jsx"

export const store=configureStore({
    reducer:{
        auth:AuthSlice,
        Song:songSlice
    }
})