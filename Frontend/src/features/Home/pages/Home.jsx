import React, { useEffect } from 'react'
import FaceExpression from '../../Expression/pages/FaceExpression'
import Player from '../components/Player'
import { PageSkeleton } from '../../shared/components/Skeleton'
import { useSong } from '../hook/useSong'
import { useAuth } from '../../auth/hook/useAuth'
import { useToast } from '../../shared/context/ToastContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import '../style/HomeHeader.scss'

const Home = () => {
      const { handleLogout} = useAuth()


  const { handleGetSong } = useSong()

  const Loading = useSelector((state) => state.auth.Loading)
  const user = useSelector((state) => state.auth.user)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await handleLogout()
      showToast('Logged out successfully', 'info')
      navigate('/Login')
    } catch (err) {
      console.error('Logout error:', err)
      showToast('Error logging out. Please try again.', 'error')
    }
  }


  if (Loading) {
    return (
      <main className="w-full">
        <PageSkeleton />
      </main>
    )
  }

  return (
    <div className="home-screen-wrapper">
      {/* Modern Top Navigation Bar */}
      <header className="home-top-nav">
        <div className="nav-brand" onClick={() => navigate('/')} title="Song.com Home">
          <div className="brand-logo-icon">🎵</div>
          <span className="brand-name">
            Song<span className="brand-accent">.com</span>
          </span>
          <span className="hifi-badge">24-bit HiFi</span>
        </div>

        <div className="nav-actions">
          {/* Profile Button */}
          <button
            className="nav-btn nav-profile-btn"
            onClick={() => navigate('/Profile')}
            title="My Profile"
          >
            <div className="avatar-chip">
              {user?.photo ? (
                <img src={user.photo} alt={user.username || 'User'} className="avatar-img" />
              ) : (
                <span className="avatar-text">
                  {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
            </div>
            <span className="nav-username">{user?.username || 'Profile'}</span>
          </button>

          {/* Logout Button */}
          <button className="nav-btn nav-logout-btn" onClick={onLogout} title="Sign Out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content: Mood Expression Detector & Music Player */}
      <main className="home-main-content">
        <FaceExpression onClick={(expression) => handleGetSong({ mood: expression })} />
        <Player />
      </main>
    </div>
  )
}

export default Home