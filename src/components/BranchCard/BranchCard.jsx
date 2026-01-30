import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../ProgressBar/ProgressBar'
import './BranchCard.css'

const BranchCard = ({ career, matchPercentage }) => {
  const navigate = useNavigate()

  if (!career) return null

  const handleViewDetails = () => {
    navigate('/career-details', { state: { career } })
  }

  return (
    <div className="branch-card">
      <div className="branch-card-header">
        <div className="branch-card-title-section">
          <h3 className="branch-card-title">{career.name}</h3>
          <span className="branch-card-category">{career.category}</span>
        </div>
        <ProgressBar percentage={matchPercentage} />
      </div>

      <p className="branch-card-description">{career.description}</p>

      {career.matchReasons && career.matchReasons.length > 0 && (
        <div className="branch-card-why-match">
          <h4 className="why-match-title">Why This Matches:</h4>
          <ul className="why-match-list">
            {career.matchReasons.slice(0, 2).map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
            {career.matchReasons.length > 2 && (
              <li className="more-reasons">+{career.matchReasons.length - 2} more reasons</li>
            )}
          </ul>
        </div>
      )}
      
      <button
        className="branch-card-expand-btn"
        onClick={handleViewDetails}
      >
        View Full Details
        <span className="expand-icon">→</span>
      </button>
    </div>
  )
}

export default BranchCard

