import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfilePending.css'

const ProfilePending = () => {
  const navigate = useNavigate()

  return (
    <div className="profile-pending-container">
      <div className="profile-pending-card">
        <div className="profile-pending-icon">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
        </div>
        <h2 className="profile-pending-title">Profile Incomplete</h2>
        <p className="profile-pending-message">
          Your profile is incomplete. Complete it to get personalized recommendations.
        </p>
        <button 
          className="profile-pending-btn"
          onClick={() => navigate('/complete-profile')}
        >
          Complete Profile
        </button>
      </div>
    </div>
  )
}

export default ProfilePending

