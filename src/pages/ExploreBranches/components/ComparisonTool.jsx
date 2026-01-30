import React from 'react'
import './ComparisonTool.css'

export default function ComparisonTool({ branches }) {
  const metrics = [
    { key: 'codingIntensity', label: 'Coding Intensity', unit: '%' },
    { key: 'difficulty', label: 'Difficulty Level', unit: '/100' },
    { key: 'salaryRange', label: 'Avg Salary Range', unit: '' },
    { key: 'demandTrend', label: 'Market Demand', unit: '' }
  ]

  const subjectsList = Array.from(
    new Set(branches.flatMap(b => b.subjects))
  ).slice(0, 8)

  const rolesList = Array.from(
    new Set(branches.flatMap(b => b.jobRoles))
  ).slice(0, 5)

  return (
    <div className="comparison-tool">
      <div className="comparison-scroll">
        {/* Metrics Comparison */}
        <div className="comparison-section">
          <h3>Key Metrics</h3>
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comparison-label">Metric</div>
              {branches.map(branch => (
                <div key={branch.id} className="comparison-col">
                  <div className="branch-name">{branch.name}</div>
                  <div className="branch-icon">{branch.icon}</div>
                </div>
              ))}
            </div>

            {metrics.map(metric => (
              <div key={metric.key} className="comparison-row">
                <div className="row-label">{metric.label}</div>
                {branches.map(branch => (
                  <div key={branch.id} className="comparison-cell">
                    {typeof branch[metric.key] === 'number' ? (
                      <>
                        <div className="metric-bar-bg">
                          <div
                            className="metric-bar-fill"
                            style={{
                              width: Math.min(branch[metric.key], 100) + '%'
                            }}
                          />
                        </div>
                        <span className="metric-value">
                          {branch[metric.key]}{metric.unit}
                        </span>
                      </>
                    ) : (
                      <span className="metric-text">{branch[metric.key]}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Subjects Comparison */}
        <div className="comparison-section">
          <h3>Core Subjects</h3>
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comparison-label">Subject</div>
              {branches.map(branch => (
                <div key={branch.id} className="comparison-col">
                  <span className="branch-initials">
                    {branch.name.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
              ))}
            </div>

            {subjectsList.map((subject, idx) => (
              <div key={idx} className="comparison-row">
                <div className="row-label">{subject}</div>
                {branches.map(branch => (
                  <div key={branch.id} className="comparison-cell">
                    {branch.subjects.includes(subject) ? (
                      <span className="subject-badge">✓</span>
                    ) : (
                      <span className="subject-empty">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Job Roles Comparison */}
        <div className="comparison-section">
          <h3>Career Paths</h3>
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comparison-label">Role</div>
              {branches.map(branch => (
                <div key={branch.id} className="comparison-col">
                  <span className="branch-initials">
                    {branch.name.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
              ))}
            </div>

            {rolesList.map((role, idx) => (
              <div key={idx} className="comparison-row">
                <div className="row-label">{role}</div>
                {branches.map(branch => (
                  <div key={branch.id} className="comparison-cell">
                    {branch.jobRoles.includes(role) ? (
                      <span className="role-badge">✓</span>
                    ) : (
                      <span className="role-empty">—</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="comparison-section">
          <h3>Top Hiring Companies</h3>
          <div className="comparison-companies">
            {branches.map(branch => (
              <div key={branch.id} className="company-column">
                <h4>{branch.name}</h4>
                <div className="company-list">
                  {branch.companies.map((company, idx) => (
                    <span key={idx} className="company-tag">{company}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="comparison-summary">
        <h3>Quick Summary</h3>
        <div className="summary-grid">
          {branches.map(branch => (
            <div key={branch.id} className="summary-card">
              <span className="summary-icon">{branch.icon}</span>
              <p className="summary-name">{branch.name}</p>
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-icon">💻</span>
                  <span>{branch.codingIntensity}%</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-icon">📈</span>
                  <span>{branch.demandTrend}</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-icon">💰</span>
                  <span>{branch.salaryRange}</span>
                </div>
              </div>
              <a href="#" className="summary-link">View Full Details →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
