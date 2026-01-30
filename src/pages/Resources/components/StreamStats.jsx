import React, { useState } from 'react'
import '../styles/StreamStats.css'

function StreamStats({ college, selectedStream, onStreamChange, onClose }) {
  const stream = college.streams.find(s => s.stream === selectedStream)

  if (!stream) return null

  return (
    <div className="stream-stats-panel">
      <div className="stream-header">
        <h3>{selectedStream}</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="stream-stats-grid">
        <div className="stat-box">
          <span className="label">Average Package</span>
          <span className="value">{stream.avg_package}</span>
        </div>
        <div className="stat-box">
          <span className="label">Highest Package</span>
          <span className="value">{stream.highest_package}</span>
        </div>
        <div className="stat-box">
          <span className="label">Placement %</span>
          <span className="value">{stream.placement_percent}%</span>
        </div>
      </div>

      <div className="recruiters-section">
        <h4>Core Recruiters</h4>
        <div className="recruiters-grid">
          {stream.recruiters.map((recruiter, idx) => (
            <div key={idx} className="recruiter-badge">
              {recruiter}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StreamStats
