import React from 'react'
import { useNavigate } from 'react-router'
import "../style/MyHome.scss"

const MyHome = () => {
    const Navigate = useNavigate()
    
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">🎵 Welcome to Moodify</h1>
          <p className="welcome-subtitle">Your Personal Music Mood Journey</p>
          <p className="welcome-description">
            Discover music that matches your emotions. Create personalized playlists based on your mood and enjoy an immersive listening experience.
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
            <p className="feature-text">Music curated based on your current mood</p>
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
            onClick={() => Navigate("/Register")}
          >
            <span className="btn-icon">✨</span>
            Get Started
            <span className="btn-arrow">→</span>
          </button>
          <button 
            className="btn btn--secondary"
            onClick={() => Navigate("/login")}
          >
            <span className="btn-icon">🔓</span>
            Login
            <span className="btn-arrow">→</span>
          </button>
        </div>

        {/* Footer Text */}
        <p className="footer-text">Join thousands of music lovers today</p>
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