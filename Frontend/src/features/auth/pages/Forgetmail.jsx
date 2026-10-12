import React, { useState } from 'react'
import { Link } from 'react-router'
import Formcommon from '../components/Formcommon'

import { useToast } from '../../shared/context/ToastContext'
import '../style/form.scss'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'

const Forgetmail = () => {

  const {handleForgetMail} =useAuth()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      showToast('Please enter your email address', 'error')
      return
    }

    try {
      setIsSubmitting(true)
      await handleForgetMail({ email })
      setIsSent(true)
      showToast('Password reset link sent to your email!', 'success')
    } catch (err) {
      console.error('Forget mail error:', err)
      const errorMsg =
        err?.response?.data?.message || 'Failed to send reset email. Please verify the email address.'
      showToast(errorMsg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page-wrapper">
      <div className="form-Container">
        <div className="brand-header">
          <div className="logo-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="brand-title">Song.com</h2>
          <p className="brand-subtitle">Reset your account password</p>
        </div>

        {isSent ? (
          <div>
            <div className="auth-banner-notice success">
              <div className="banner-icon">✉️</div>
              <h3 className="banner-title">Check Your Email</h3>
              <p className="banner-text">
                We sent a secure password reset link to <strong style={{ color: '#ffffff' }}>{email}</strong>. The link is valid for 60 minutes.
              </p>
            </div>

            <button
              className="button"
              type="button"
              onClick={() => setIsSent(false)}
              style={{ marginBottom: '14px' }}
            >
              Send Another Link
            </button>

            <p className="auth-footer-text">
              Remembered your password? <Link to="/Login">Sign In</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.5', textAlign: 'center' }}>
              Enter the email associated with your Song.com account and we'll send you a password reset link.
            </p>

            <Formcommon
              type="email"
              label="Email Address"
              value={email}
              setvalue={setEmail}
              placeholder="Enter your registered email"
              id="reset-email"
              required
            />

            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="btn-spinner">Sending link...</span>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <p className="auth-footer-text">
              Remember your password? <Link to="/Login">Back to Sign In</Link>
            </p>

            <div className="auth-secondary-links">
              <Link to="/Resend_verifymail">Need email verification?</Link>
              <span className="link-dot">•</span>
              <Link to="/Register">Create account</Link>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default Forgetmail