import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Formcommon from '../components/Formcommon'
import GoogleButton from '../components/GoogleButton'
import { FormSkeleton } from '../../shared/components/Skeleton'
import { useAuth } from '../hook/useAuth'
import { useToast } from '../../shared/context/ToastContext'
import '../style/form.scss'
import {useSelector} from "react-redux"

function Register() {
  
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { handleRegister} = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
const Loading =useSelector(state=>state.auth.Loading)
console.log(Loading);
  const handlerSubmit = async (e) => {
    e.preventDefault()
    if (!username || !email || !password) {
      showToast('Please fill in all fields', 'error')
      return
    }

    try {
      await handleRegister({ username, email, password })
      
      // Trigger top-right corner pop popup notification
      showToast(`Registration successful! Account created for ${username.toUpperCase()}`, 'success')

      // DIRECTLY redirect to Login page!
      navigate('/Login')
    } catch (err) {
      console.error('Registration submit error:', err)
      const errorMsg = err?.response?.data?.message || 'Registration failed. User already exists or invalid details.'
      showToast(errorMsg, 'error')
    }
  }

  if (Loading) {
    return (
      <main className="auth-page-wrapper">
        <FormSkeleton />
      </main>
    );
  }

  return (
    <main className="auth-page-wrapper">
      <div className="form-Container">
        <div className="brand-header">
          <div className="logo-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <h2 className="brand-title">Song.com</h2>
          <p className="brand-subtitle">Create your account to discover mood music</p>
        </div>

        <form onSubmit={handlerSubmit}>
          <Formcommon
            label="Username"
            value={username}
            setvalue={setusername}
            placeholder="Enter your username"
            id="username"
            required
          />
          <Formcommon
            type="email"
            label="Email Address"
            value={email}
            setvalue={setemail}
            placeholder="Enter your email"
            id="email"
            required
          />
          <Formcommon
            type="password"
            label="Password"
            value={password}
            setvalue={setpassword}
            placeholder="Enter your password"
            id="password"
            required
          />

          <button className="button" type="submit" disabled={Loading}>
            {Loading ? (
              <span className="btn-spinner">Creating account...</span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <GoogleButton text="Continue with Google" />

        <p className="auth-footer-text">
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register