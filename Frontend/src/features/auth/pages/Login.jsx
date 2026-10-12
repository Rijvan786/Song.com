import React, { useState } from 'react'
import Formcommon from '../components/Formcommon'
import GoogleButton from '../components/GoogleButton'
import { FormSkeleton } from '../../shared/components/Skeleton'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useToast } from '../../shared/context/ToastContext'
import '../style/form.scss'
import { useSelector } from 'react-redux'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { handleLogin } = useAuth()
  const Loading = useSelector((state) => state.auth.Loading)

  const { showToast } = useToast()
  const navigate = useNavigate()

  const handlerSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      showToast('Please enter both email and password', 'error')
      return
    }

    try {
      await handleLogin({ email, password })
      showToast('Login successful! Welcome back to Song.com', 'success')
      navigate('/Protected')
    } catch (err) {
      console.error('Login submit error:', err)
      const errorMsg =
        err?.response?.data?.message || 'Invalid Credentials. Please check email and password.'
      showToast(errorMsg, 'error')
    }
  }

  if (Loading) {
    return (
      <main className="auth-page-wrapper">
        <FormSkeleton />
      </main>
    )
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
          <p className="brand-subtitle">Sign in to your mood music account</p>
        </div>

        <form onSubmit={handlerSubmit}>
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
            headerAction={
              <Link to="/Forgetmail" className="form-forgot-link">
                Forgot password?
              </Link>
            }
          />

          <button className="button" type="submit" disabled={Loading}>
            {Loading ? (
              <span className="btn-spinner">Logging in...</span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <GoogleButton text="Continue with Google" />

        <p className="auth-footer-text">
          Don't have an account? <Link to="/Register">Register</Link>
        </p>

        <div className="auth-secondary-links">
          <Link to="/Resend_verifymail">Resend verification email</Link>
        </div>
      </div>
    </main>
  )
}

export default Login