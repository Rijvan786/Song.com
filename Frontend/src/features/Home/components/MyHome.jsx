import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useAuth } from '../../auth/hook/useAuth'
import { useToast } from '../../shared/context/ToastContext'
import "../style/MyHome.scss"

const MyHome = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { handleLogout } = useAuth()
  const { showToast } = useToast()

  const onLogout = async () => {
    try {
      await handleLogout()
      showToast('Logged out successfully', 'info')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className="home-container">
      {/* Top Navigation Bar with Profile Icon */}
      <header className="myhome-top-nav">
        <div className="myhome-brand" onClick={() => navigate('/')}>
          <span className="brand-icon">🎵</span>
          <span className="brand-title-text">
            Song<span className="brand-accent-text">.com</span>
          </span>
        </div>

        <div className="myhome-nav-actions">
          {user ? (
            <>
              {/* Profile Icon Button */}
              <button
                className="myhome-profile-pill"
                onClick={() => navigate('/Profile')}
                title="View Profile"
              >
                <div className="profile-avatar-circle">
                  {user.photo ? (
                    <img src={user.photo} alt={user.username || 'Profile'} />
                  ) : (
                    <span>{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</span>
                  )}
                </div>
                <span className="profile-name-text">{user.username || 'Profile'}</span>
              </button>

              <button
                className="myhome-nav-btn myhome-player-btn"
                onClick={() => navigate('/Protected')}
                title="Launch Music Player"
              >
                <span>🎧</span> Launch Player
              </button>

              <button
                className="myhome-nav-btn myhome-logout-btn"
                onClick={onLogout}
                title="Sign Out"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Guest Profile Icon */}
              <button
                className="myhome-profile-pill guest"
                onClick={() => navigate('/Login')}
                title="Sign In to Profile"
              >
                <div className="profile-avatar-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="profile-name-text">Profile</span>
              </button>

              <button
                className="myhome-nav-btn myhome-login-btn"
                onClick={() => navigate('/Login')}
              >
                Login
              </button>
            </>
          )}
        </div>
      </header>

      <div className="home-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">🎵 Welcome to Song.com</h1>
          <p className="welcome-subtitle">Your Personal Music Mood Journey</p>
          <p className="welcome-description">
            Discover music that matches your emotions. Create personalized playlists based on your mood and enjoy an immersive, lossless listening experience.
          </p>
        </div>

        {/* Features Preview */}
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎧</span>
            <h3 className="feature-title">Listen Anywhere</h3>
            <p className="feature-text">Stream your favorite tracks anytime, anywhere</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">😊</span>
            <h3 className="feature-title">Mood Based</h3>
            <p className="feature-text">Music curated dynamically based on your current expression</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3 className="feature-title">Advanced Controls</h3>
            <p className="feature-text">Speed, volume, and playback customization</p>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="button-section">
          <button 
            className="btn btn--primary"
            onClick={() => navigate(user ? "/Protected" : "/Register")}
          >
            <span className="btn-icon">✨</span>
            {user ? "Enter Audio Lounge" : "Get Started"}
            <span className="btn-arrow">→</span>
          </button>
          {!user && (
            <button 
              className="btn btn--secondary"
              onClick={() => navigate("/Login")}
            >
              <span className="btn-icon">🔓</span>
              Login
              <span className="btn-arrow">→</span>
            </button>
          )}
        </div>

        {/* Footer Text */}
        <p className="footer-text">Join thousands of music lovers today • Lossless 24-bit HiFi Streaming</p>
      </div>

      {/* Floating Background Elements */}
      <div className="floating-bg">
        <div className="float-1"></div>
        <div className="float-2"></div>
        <div className="float-3"></div>
      </div>
    </div>
  )
}

export default MyHome