import React, { useState } from 'react'
import '../styles/CollegeCard.css'

function CollegeCard({ college, onViewDetails, isSelected, onToggleCompare }) {
  const [imgError, setImgError] = useState(false)

  const handleImageError = () => {
    setImgError(true)
  }

  return (
    <div className={`college-card ${isSelected ? 'selected' : ''}`}>
      <div className="card-header">
        <div className="college-logo-wrapper">
          {!imgError ? (
            <img src={college.logo} alt={college.name} className="college-logo" onError={handleImageError} />
          ) : (
            <div className="logo-fallback">{college.name.split(' ')[0].charAt(0)}</div>
          )}
        </div>
        <div className="college-badge">
          {college.type === 'Government' ? (
            <span className="badge govt">Govt</span>
          ) : (
            <span className="badge private">Private</span>
          )}
        </div>
        {isSelected && (
          <div className="selected-indicator">
            <span>✓</span>
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="college-name">{college.name}</h3>
        
        <div className="college-meta">
          <p className="city">{college.city}, {college.state}</p>
          <p className="year">Est. {college.established}</p>
        </div>

        <div className="college-stats">
          <div className="stat">
            <div className="stat-label">NIRF Rank</div>
            <div className="stat-value">#{college.nirf_rank}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Avg Package</div>
            <div className="stat-value">{college.streams[0]?.avg_package || 'N/A'}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Highest</div>
            <div className="stat-value">{college.streams[0]?.highest_package || 'N/A'}</div>
          </div>
        </div>

        <div className="accreditation">
          <span className="accred-badge">{college.accreditation}</span>
        </div>

        <div className="streams-preview">
          <span className="streams-label">Streams:</span>
          <div className="streams-list">
            {college.streams.slice(0, 2).map((stream, idx) => (
              <span key={idx} className="stream-tag">{stream.stream.split(' ')[0]}</span>
            ))}
            {college.streams.length > 2 && (
              <span className="stream-tag">+{college.streams.length - 2}</span>
            )}
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button className="view-details-btn" onClick={() => onViewDetails(college)}>
          View Details →
        </button>
        {onToggleCompare && (
          <button 
            className={`compare-btn ${isSelected ? 'selected' : ''}`}
            onClick={() => onToggleCompare(college)}
            title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
          >
            {isSelected ? '✓ Selected' : '+ Compare'}
          </button>
        )}
      </div>
    </div>
  )
}

export default CollegeCard
