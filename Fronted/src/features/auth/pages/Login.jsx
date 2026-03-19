import React, { useState } from 'react'
import Formcommon from '../components/Formcommon'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'

const Login = () => {
   const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const {handlelogin,Loading}=useAuth()
    const navigator=useNavigate()
   const handlerSubmit=async(e)=>{
 
    e.preventDefault()
    try{
      await handlelogin({email,password})
       alert("successfully login")
        navigator("/Protected")
    }
    catch(err){
      alert("Invalid Cretials",err)
    }
   
  
   

     
  }

  return (
    <main>
       
      <div className="form-Container">
        <form onSubmit={handlerSubmit}><div className="register"><h1>Login</h1></div>
        
         <Formcommon
         label="Email" 
         value={email}  
         setvalue={setemail}
         placeholder={"Enter your Email"}
         id="passoword"
         />
         <Formcommon 
         type="password"
         label="Password"
          value={password} 
             setvalue={setpassword} 
             placeholder={"Enter your password"}
             />

         <button className='button'>Submit</button>
      </form>
      
      <p>Don't have a account ?<Link to="/Register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login