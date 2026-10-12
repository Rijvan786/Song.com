import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import Formcommon from '../components/Formcommon'
import { useAuth } from '../hook/useAuth'
import { useToast } from '../../shared/context/ToastContext'
import '../style/form.scss'

const Resend_Verifymail = () => {
  const {handleResendMail} =useAuth()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const { showToast } = useToast()

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      showToast('Please enter your email address', 'error')
      return
    }

    if (countdown > 0) {
      showToast(`Please wait ${countdown}s before requesting again`, 'info')
      return
    }

    try {
      setIsSubmitting(true)
      const data = await handleResendMail({ email })
      setIsSent(true)
      setCountdown(60) // Start 60 second cooldown
      showToast(data?.message || 'Verification email sent successfully!', 'success')
    } catch (err) {
      console.error('Resend verify mail error:', err)
      const retryAfter = err?.response?.data?.retryAfter
      if (retryAfter) {
        setCountdown(retryAfter)
      }
      const errorMsg =
        err?.response?.data?.message || 'Failed to resend verification email. Please try again.'
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
              <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
              <polyline points="22,6 12,13 2,6" />
              <path d="M19 16v6" />
              <path d="M22 19l-3 3-3-3" />
            </svg>
          </div>
          <h2 className="brand-title">Song.com</h2>
          <p className="brand-subtitle">Resend email verification link</p>
        </div>

        {isSent ? (
          <div>
            <div className="auth-banner-notice info">
              <div className="banner-icon">📬</div>
              <h3 className="banner-title">Verification Link Sent</h3>
              <p className="banner-text">
                A fresh activation link was sent to <strong style={{ color: '#ffffff' }}>{email}</strong>. Please check your inbox and spam folder.
              </p>
            </div>

            <button
              className="button"
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || countdown > 0}
              style={{ marginBottom: '14px' }}
            >
              {countdown > 0 ? `Resend again in ${countdown}s` : 'Send Another Email'}
            </button>

            <p className="auth-footer-text">
              Ready to log in? <Link to="/Login">Sign In</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.5', textAlign: 'center' }}>
              Didn't receive your account confirmation email? Enter your email address below to receive a new one.
            </p>

            <Formcommon
              type="email"
              label="Email Address"
              value={email}
              setvalue={setEmail}
              placeholder="Enter your registered email"
              id="resend-email"
              required
            />

            <button
              className="button"
              type="submit"
              disabled={isSubmitting || countdown > 0}
            >
              {isSubmitting ? (
                <span className="btn-spinner">Sending email...</span>
              ) : countdown > 0 ? (
                `Wait ${countdown}s`
              ) : (
                'Resend Verification Email'
              )}
            </button>

            <p className="auth-footer-text">
              Already verified? <Link to="/Login">Back to Sign In</Link>
            </p>

            <div className="auth-secondary-links">
              <Link to="/Forgetmail">Forgot password?</Link>
              <span className="link-dot">•</span>
              <Link to="/Register">Create new account</Link>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default Resend_Verifymail