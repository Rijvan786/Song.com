import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export const  register=async({username,email,password})=>{
     const response=await api.post("/api/web/register",{
        username,
        email,
        password
     })
     console.log(response);
     return response.data
}
export const login=async({username,email,password})=>{
      
    const response=await api.post("/api/web/login",{
        username,
        email,
        password
    })
     console.log(response);

    return response.data
}

export const getme=async()=>{
    const response =await api.get("/api/web/getme")
     console.log(response);

    return response.data
}
export const logout=async ()=>{
    const response=await api.get("/api/web/logout")
     console.log(response);

    return response.data
}