import React, { useRef, useEffect, useState, useContext } from 'react'
import { Songcontext } from '../Song.context'
import '../style/Player.scss'
import { useSong } from '../hook/useSong'

const Player = () => {
  const audioRef = useRef(null)
  const { song, Loading } = useSong()
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [speed, setSpeed] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)

  // Format time helper
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Play/Pause handler
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => console.error('Play error:', err))
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Update current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Update duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Seek to position
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  // Speed change
  const handleSpeedChange = (speedValue) => {
    setSpeed(speedValue)
    if (audioRef.current) {
      audioRef.current.playbackRate = speedValue
    }
    setShowSpeedMenu(false)
  }

  // Skip forward
  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration)
    }
  }

  // Skip backward
  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
    }
  }

  // Handle song end
  const handleEnded = () => {
    setIsPlaying(false)
  }

  // Pause when loading
  useEffect(() => {
    if (Loading && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [Loading])

  // Update audio source
  useEffect(() => {
    if (audioRef.current && song.url) {
      audioRef.current.src = song.url
      audioRef.current.volume = volume
      audioRef.current.playbackRate = speed
    }
  }, [song.url])

  return (
    <div className="player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Info Section */}
      <div className="player__info">
        <img
          src={song.posturl}
          alt={song.title}
          className="player__poster"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/140?text=No+Image'
          }}
        />
        <div className="player__meta">
          <h3 className="player__title">{song.title}</h3>
          <span className="player__mood">{song.mood}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="player__progress-wrap">
        <span className="player__time">{formatTime(currentTime)}</span>
        <div className="player__progress" onClick={handleSeek}>
          <div
            className="player__progress-fill"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
          <div
            className="player__progress-thumb"
            style={{ left: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <span className="player__time">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="player__controls">
        {/* Speed Button */}
        <div className="player__speed-wrap">
          <button
            className="player__btn player__btn--speed"
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            title="Playback speed"
          >
            {speed}x
          </button>
          {showSpeedMenu && (
            <div className="player__speed-menu">
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speedOpt) => (
                <button
                  key={speedOpt}
                  className={`player__speed-option ${speed === speedOpt ? 'active' : ''}`}
                  onClick={() => handleSpeedChange(speedOpt)}
                >
                  {speedOpt}x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Skip Backward */}
        <button
          className="player__btn player__btn--skip"
          onClick={handleSkipBackward}
          title="Skip backward 10s"
        >
          <span>⏪</span>
          <span>10s</span>
        </button>

        {/* Play/Pause */}
        <button
          className="player__btn player__btn--play"
          onClick={handlePlayPause}
          disabled={Loading}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* Skip Forward */}
        <button
          className="player__btn player__btn--skip"
          onClick={handleSkipForward}
          title="Skip forward 10s"
        >
          <span>⏩</span>
          <span>10s</span>
        </button>

        {/* Volume Control */}
        <div className="player__volume">
          <button className="player__btn player__btn--vol" title="Volume">
            {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="player__volume-slider"
            style={{
              '--volume-percentage': `${volume * 100}%`,
            }}
            title="Volume control"
          />
        </div>
      </div>
    </div>
  )
}

export default Player