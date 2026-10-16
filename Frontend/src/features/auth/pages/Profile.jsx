import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useToast } from '../../shared/context/ToastContext'
import '../style/Profile.scss'

const Profile = () => {
  const Loading  = useSelector((state) => state.auth.Loading)
  const user = useSelector((state)=>state.auth.user)
  console.log(user)
  const { handleLogout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await handleLogout()
      showToast('Logged out successfully', 'info')
      navigate('/Login')
    } catch (err) {
      console.error('Logout error:', err)
      showToast('Error during logout', 'error')
    }
  }

  // Smooth loading skeleton state
  if (Loading) {
    return (
      <div className="profile-page-wrapper">
        <header className="profile-nav-header">
          <div className="nav-brand" onClick={() => navigate('/')}>
            <span className="brand-icon">🎵</span>
            <span className="brand-name">
              Song<span className="brand-accent">.com</span>
            </span>
          </div>
        </header>
        <div className="profile-skeleton-wrapper">
          <div className="sk-hero"></div>
          <div className="sk-grid">
            <div className="sk-card"></div>
            <div className="sk-card"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page-wrapper">
      {/* Top Navigation */}
      <header className="profile-nav-header">
        <div className="nav-brand" onClick={() => navigate('/')} title="Song.com Home">
          <span className="brand-icon">🎵</span>
          <span className="brand-name">
            Song<span className="brand-accent">.com</span>
          </span>
        </div>

        <div className="nav-actions">
          <button
            className="nav-action-btn player-btn"
            onClick={() => navigate('/Protected')}
            title="Open Music Player"
          >
            <span>🎧</span> Player
          </button>
          <button
            className="nav-action-btn logout-btn"
            onClick={onLogout}
            title="Sign Out"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Profile Body */}
      <main className="profile-content-container">
        {/* Hero Card */}
        <div className="profile-hero-card">
          <div className="avatar-section">
            <div className="avatar-ring">
              <div className="avatar-core">
                {user?.photo ? (
                  <img src={user.photo} alt={user.username || 'User Avatar'} />
                ) : (
                  <span className="avatar-letter">
                    {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </div>
            </div>
            <div className="avatar-status-dot" title="Account Active"></div>
          </div>

          <h1 className="user-display-name">{user?.username || 'Song.com Listener'}</h1>
          <p className="user-email-text">{user?.email || 'listener@song.com'}</p>

          <div className="profile-badge-row">
            {user?.verified ? (
              <span className="badge-pill verified">
                <span>🛡️</span> Verified Listener
              </span>
            ) : (
              <span
                className="badge-pill unverified"
                onClick={() => navigate('/Resend_verifymail')}
                style={{ cursor: 'pointer' }}
                title="Click to verify your email"
              >
                <span>⚠️</span> Unverified (Resend link)
              </span>
            )}
            <span className="badge-pill membership">
              <span>✨</span> Lossless 24-bit HiFi
            </span>
          </div>
        </div>

        {/* Audio Stats Grid */}
        <div className="profile-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">🎧</div>
            <div className="stat-info">
              <div className="stat-label">Audio Stream Quality</div>
              <div className="stat-value">24-bit HiFi / 96kHz</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">🎭</div>
            <div className="stat-info">
              <div className="stat-label">Mood Detection Engine</div>
              <div className="stat-value">AI Face Tracking Active</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">🔒</div>
            <div className="stat-info">
              <div className="stat-label">Security &amp; Auth</div>
              <div className="stat-value">Encrypted JWT Session</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">🌐</div>
            <div className="stat-info">
              <div className="stat-label">Linked Provider</div>
              <div className="stat-value">{user?.googleId ? 'Google OAuth' : 'Direct Account'}</div>
            </div>
          </div>
        </div>

        {/* Action Controls Card */}
        <div className="profile-actions-card">
          <button
            className="action-card-btn primary-launch-btn"
            onClick={() => navigate('/Protected')}
          >
            <span>✨</span> Enter Music Lounge &rarr;
          </button>

          {!user?.verified && (
            <button
              className="action-card-btn secondary-outline-btn"
              onClick={() => navigate('/Resend_verifymail')}
            >
              Verify My Email Address
            </button>
          )}

          <button
            className="action-card-btn secondary-outline-btn"
            onClick={() => navigate('/Forgetmail')}
          >
            Change / Reset Password
          </button>

          <button
            className="action-card-btn danger-logout-btn"
            onClick={onLogout}
          >
            Sign Out of Account
          </button>
        </div>
      </main>
    </div>
  )
}

export default Profile