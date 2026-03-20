import axios from "axios"

const api=axios.create({
    baseURL:"https://moodify-web.onrender.com/api/web",
    withCredentials:true
})

export const  register=async({username,email,password})=>{
     const response=await api.post("/register",{
        username,
        email,
        password
     })
     console.log(response);
     return response.data
}
export const login=async({username,email,password})=>{
      
    const response=await api.post("/login",{
        username,
        email,
        password
    })
     console.log(response);

    return response.data
}

export const getme=async()=>{
    const response =await api.get("/getme")
     console.log(response);

    return response.data
}
export const logout=async ()=>{
    const response=await api.get("/logout")
     console.log(response);

    return response.data
}