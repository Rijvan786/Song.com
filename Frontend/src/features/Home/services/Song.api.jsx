import axios from "axios"

const api=axios.create({
    baseURL:"https://songcom-production.up.railway.app",
    withCredentials:true
})


export const GetSong=async({mood})=>{
    const response=await api.get("/api/songs?mood="+mood)
    console.log(response);

    return response.data
}