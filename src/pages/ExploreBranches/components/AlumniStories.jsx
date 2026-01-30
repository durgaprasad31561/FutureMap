import React, { useState } from 'react'
import './AlumniStories.css'

export default function AlumniStories({ stories }) {
  const [expandedStory, setExpandedStory] = useState(null)

  return (
    <div className="alumni-stories">
      <div className="alumni-grid">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className={`alumni-card ${expandedStory === idx ? 'expanded' : ''}`}
          >
            <div className="alumni-header">
              <div className="alumni-avatar">
                <span className="avatar-initial">{story.name[0]}</span>
              </div>
              <div className="alumni-info">
                <h3>{story.name}</h3>
                <p className="alumni-role">{story.role}</p>
                <p className="alumni-company">{story.company}</p>
              </div>
              <span className="alumni-badge">{story.branch}</span>
            </div>

            <div className="alumni-metrics">
              <div className="metric">
                <span className="metric-icon">⚡</span>
                <span className="metric-label">Batch</span>
                <span className="metric-value">{story.batch}</span>
              </div>
              <div className="metric">
                <span className="metric-icon">💰</span>
                <span className="metric-label">Salary</span>
                <span className="metric-value">{story.salary}</span>
              </div>
              <div className="metric">
                <span className="metric-icon">📈</span>
                <span className="metric-label">Growth</span>
                <span className="metric-value">{story.growth}</span>
              </div>
            </div>

            {expandedStory === idx && (
              <div className="alumni-story-content">
                <p className="story-text">{story.story}</p>
                <div className="story-highlights">
                  {story.highlights && story.highlights.map((highlight, hidx) => (
                    <div key={hidx} className="highlight">
                      <span className="highlight-icon">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="alumni-expand-btn"
              onClick={() => setExpandedStory(expandedStory === idx ? null : idx)}
            >
              {expandedStory === idx ? 'Read Less' : 'Read Story'}
            </button>
          </div>
        ))}
      </div>

      {stories.length < 5 && (
        <div className="alumni-cta">
          <p>Want to be featured? Share your success story!</p>
          <button className="alumni-submit-btn">📝 Submit Your Story</button>
        </div>
      )}
    </div>
  )
}
