import React, { useEffect } from 'react'
import { Navigate } from 'react-router'
import { PageSkeleton } from '../../shared/components/Skeleton'
import { useSelector } from 'react-redux'
import { useAuth } from '../hook/useAuth'

const Protected = ({ children }) => {
  const  Loading  = useSelector((state) => state.auth.Loading)
  const user  = useSelector((state)=>state.auth.user)
  const  {handlegetme} =useAuth()

    

  // Wait for initial session validation before making redirection decision
useEffect(()=>{

   handlegetme()

    if (Loading) {
    return (
      <main className="w-full">
        <PageSkeleton />
      </main>
    ) 
  }

  if (!user) {
    return <Navigate to="/Login" replace />
  }
},[])

  return children
}

export default Protected