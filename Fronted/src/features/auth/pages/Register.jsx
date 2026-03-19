import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Formcommon from '../components/Formcommon'
import "../style/form.scss"
import { useAuth } from '../hook/useAuth'

function Register() {
const [username, setusername] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const {handleregister,Loading}=useAuth()
  const navigator=useNavigate()
  const handlerSubmit=async(e)=>{
    e.preventDefault()
    try{
      await handleregister({username,email,password})
    console.log(username,email,password);
     navigator("/login")
    alert("Successfully register")
   
    }
    catch(err){
      alert("Invalid Credetials",err)
    }
     
  }

  return (
    <main>
       
      <div className="form-Container">
        <form onSubmit={handlerSubmit}><div className="register"><h1>Register</h1></div>
         <Formcommon label="Username"  
          value={username} 
         setvalue={setusername}
         placeholder="Enter your useraname"
          />
         <Formcommon 
         label="Email" 
         value={email}  
         setvalue={setemail}
         placeholder={"Enter your Email"}
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
      
      <p>allready have a account ?<Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register