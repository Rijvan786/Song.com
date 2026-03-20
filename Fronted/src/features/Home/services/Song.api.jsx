import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3000"
})


export const getsong=async({mood})=>{
    const response=await api.get("/api/songs?mood="+mood)
    console.log(response);
    return response.data
}