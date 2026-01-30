import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div 
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="progress-bar-text">{percentage}% Match</span>
    </div>
  )
}

export default ProgressBar

