import React from 'react'
import { useAuth } from '../hook/useAuth'
import { Navigate } from 'react-router'

const Protected = ({children}) => {
const {Loading,user}=useAuth()
console.log(user);
      if(Loading){
        return (<main>
          <h1>Loading......</h1>
       
        </main>)
      }

      if(!user){
          return <Navigate to="/login"/>
      }
  return children
}

export default Protected