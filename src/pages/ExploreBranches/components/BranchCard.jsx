import React from 'react'
import './BranchCard.css'

export default function BranchCard({
  branch,
  isSelected,
  isComparing,
  onSelect,
  onCompare
}) {
  return (
    <div className={`branch-card ${isSelected ? 'selected' : ''} ${isComparing ? 'comparing' : ''}`}>
      <div className="branch-card-header">
        <span className="branch-icon">{branch.icon}</span>
        <h3>{branch.name}</h3>
      </div>

      <p className="branch-description">{branch.description}</p>

      <div className="branch-meta">
        <div className="branch-meta-item">
          <span className="meta-label">Coding</span>
          <div className="meta-progress">
            <div
              className="meta-progress-bar"
              style={{ width: branch.codingIntensity + '%' }}
            />
          </div>
        </div>

        <div className="branch-meta-item">
          <span className="meta-label">Difficulty</span>
          <span className="meta-value">{branch.difficulty}/100</span>
        </div>

        <div className="branch-meta-item">
          <span className="meta-label">Demand</span>
          <span className="meta-demand">{branch.demandTrend}</span>
        </div>
      </div>

      <div className="branch-salary">
        <span className="salary-label">Avg Salary:</span>
        <span className="salary-value">{branch.salaryRange}</span>
      </div>

      <div className="branch-roles">
        <p className="roles-label">Top Roles:</p>
        <div className="roles-list">
          {branch.jobRoles.slice(0, 3).map((role, idx) => (
            <span key={idx} className="role-badge">{role}</span>
          ))}
        </div>
      </div>

      <div className="branch-actions">
        <button
          className="branch-action-btn view-btn"
          onClick={onSelect}
        >
          {isSelected ? '👁️ Viewing' : 'View Details'}
        </button>

        <button
          className={`branch-action-btn compare-btn ${isComparing ? 'active' : ''}`}
          onClick={onCompare}
        >
          {isComparing ? '✓ Added' : '+ Compare'}
        </button>
      </div>

      {isComparing && <div className="branch-compare-badge">In Comparison</div>}
    </div>
  )
}
