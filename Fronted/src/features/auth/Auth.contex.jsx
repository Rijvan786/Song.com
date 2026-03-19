


import { useState } from "react";
import { createContext } from "react";
import { SongProvider } from "../Home/Song.context";


export const AuthContext=createContext()

export const AuthProvider=({children})=>{
        const [user, setuser] = useState("")
        const [Loading, setLoading] = useState(true)

        return (
            <AuthContext.Provider value={{user,setuser,Loading,setLoading}}>
                 <SongProvider>
                    {children}
                 </SongProvider>
            </AuthContext.Provider>
        )
}