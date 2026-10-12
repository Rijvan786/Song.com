import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import Formcommon from '../components/Formcommon'
import { useAuth } from '../hook/useAuth'
import { useToast } from '../../shared/context/ToastContext'
import '../style/form.scss'
import { useSelector } from 'react-redux'

const ForgetPassword = () => {
  const {handleForgetPassword}=useAuth()
  const [searchParams] = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || ''
  const emailFromUrl = searchParams.get('email') || ''

  const [email, setEmail] = useState(emailFromUrl)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !newPassword || !confirmPassword) {
      showToast('Please fill in all fields', 'error')
      return
    }

    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'error')
      return
    }

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match. Please re-check.', 'error')
      return
    }

    try {
      setIsSubmitting(true)
      await handleForgetPassword({
        email,
        NewPassword: newPassword,
        token: tokenFromUrl || undefined,
      })
      setIsSuccess(true)
      showToast('Password updated successfully! Welcome back.', 'success')
    } catch (err) {
      console.error('Password reset error:', err)
      const errorMsg =
        err?.response?.data?.message || 'Failed to reset password. The link may have expired.'
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="brand-title">Song.com</h2>
          <p className="brand-subtitle">Set your new password</p>
        </div>

        {isSuccess ? (
          <div>
            <div className="auth-banner-notice success">
              <div className="banner-icon">✅</div>
              <h3 className="banner-title">Password Changed!</h3>
              <p className="banner-text">
                Your password has been successfully updated. You can now sign in to your Song.com account.
              </p>
            </div>

            <button
              className="button"
              type="button"
              onClick={() => navigate('/Login')}
            >
              Sign In Now &rarr;
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Formcommon
              type="email"
              label="Email Address"
              value={email}
              setvalue={setEmail}
              placeholder="Enter your account email"
              id="account-email"
              required
            />

            <Formcommon
              type="password"
              label="New Password"
              value={newPassword}
              setvalue={setNewPassword}
              placeholder="At least 8 characters"
              id="new-password"
              required
            />

            <Formcommon
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              setvalue={setConfirmPassword}
              placeholder="Confirm your new password"
              id="confirm-password"
              required
            />

            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="btn-spinner">Updating password...</span>
              ) : (
                'Update Password'
              )}
            </button>

            <p className="auth-footer-text">
              Remember your password? <Link to="/Login">Back to Sign In</Link>
            </p>
          </form>
        )}
      </div>
    </main>
  )
}

export default ForgetPassword