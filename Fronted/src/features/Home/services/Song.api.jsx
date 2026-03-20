import axios from "axios"

const api=axios.create({
    baseURL:"https://moodify-web.onrender.com"
})


export const getsong=async({mood})=>{
    const response=await api.get("/api/songs?mood="+mood)
    console.log(response);
    return response.data
}