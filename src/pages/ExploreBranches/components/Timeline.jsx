import React, { useState } from 'react'
import './Timeline.css'

export default function Timeline({ timeline }) {
  const [expandedYear, setExpandedYear] = useState(null)

  return (
    <div className="timeline">
      <div className="timeline-container">
        {timeline.map((year, idx) => (
          <div key={idx} className="timeline-item">
            <div
              className={`timeline-dot ${expandedYear === idx ? 'active' : ''}`}
              onClick={() => setExpandedYear(expandedYear === idx ? null : idx)}
            >
              <span className="dot-number">{year.year}</span>
            </div>

            <div className="timeline-content">
              <div
                className="timeline-header"
                onClick={() => setExpandedYear(expandedYear === idx ? null : idx)}
              >
                <h3>{year.focus}</h3>
                <span className="expand-icon">
                  {expandedYear === idx ? '▼' : '▶'}
                </span>
              </div>

              {expandedYear === idx && (
                <div className="timeline-details">
                  <p className="timeline-description">{year.description}</p>

                  {year.subjects && (
                    <div className="timeline-subjects">
                      <h4>Key Subjects:</h4>
                      <div className="subject-list">
                        {year.subjects.map((subject, sidx) => (
                          <span key={sidx} className="subject-chip">{subject}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {year.milestone && (
                    <div className="timeline-milestone">
                      <span className="milestone-icon">🎯</span>
                      <span>{year.milestone}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {idx < timeline.length - 1 && <div className="timeline-line" />}
          </div>
        ))}
      </div>
    </div>
  )
}
