import { useContext, useEffect } from "react";
import { getme, login, logout, register } from "../services/Auth.api";
import { AuthContext } from "../Auth.contex";
;


export const useAuth=()=>{
const constext=useContext(AuthContext)
const {user,setuser,Loading,setLoading}=constext

const handleregister=async({username,email,password})=>{
    setLoading(true)
    const data=await register({username,email,password})
    setuser(data)
    setLoading(false)
}
const handlelogin=async({username,email,password})=>{
    setLoading(true)
    const data=await login({username,email,password})
      console.log(data);
    setuser(data)
    setLoading(false)
}
const handlegetme=async()=>{
    setLoading(true)
    const  data=await getme()
    setuser(data.user)
     setLoading(false)

}

const handlellogout=async()=>{
    setLoading(true)
    const data=await logout()
    setuser(null)
    setLoading(false)

}
useEffect(()=>{
    handlegetme()
},[])
return {
    handleregister,handlelogin,handlegetme,handlellogout,user,Loading
    
}
}