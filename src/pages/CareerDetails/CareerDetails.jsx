import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './CareerDetails.css'

const CareerDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const career = location.state?.career

  if (!career) {
    return (
      <div className="career-details-container">
        <div className="career-details-error">
          <h2>Career Not Found</h2>
          <p>No career information available.</p>
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="career-details-container">
      <button onClick={() => navigate('/dashboard')} className="career-details-back">
        ← Back to Recommendations
      </button>

      <div className="career-details-hero">
        <div className="career-details-header">
          <div className="career-details-title-section">
            <span className="career-details-category">{career.category}</span>
            <h1 className="career-details-title">{career.name}</h1>
            <p className="career-details-description">{career.description}</p>
          </div>
          <div className="career-details-match">
            <ProgressBar percentage={career.matchScore} />
            <p className="match-label">Match Score</p>
          </div>
        </div>
      </div>

      {career.matchReasons && career.matchReasons.length > 0 && (
        <div className="career-details-section why-match-section">
          <h2 className="section-title">Why This Career Matches You</h2>
          <ul className="match-reasons-list">
            {career.matchReasons.map((reason, index) => (
              <li key={index} className="match-reason-item">
                <span className="match-icon">✓</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="career-details-content">
        <div className="career-details-grid">
          <div className="career-details-card">
            <h2 className="card-title">Skills to Develop</h2>
            <ul className="skills-list">
              {career.skills.map((skill, index) => (
                <li key={index} className="skill-item">
                  <span className="skill-bullet">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="career-details-card">
            <h2 className="card-title">Recommended Courses</h2>
            <ul className="courses-list">
              {career.courses.map((course, index) => (
                <li key={index} className="course-item">
                  <span className="course-icon">📚</span>
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="career-details-card institutions-card">
          <h2 className="card-title">Top Universities & Colleges</h2>
          <div className="institutions-grid">
            {career.institutions.map((institution, index) => (
              <div key={index} className="institution-card">
                <span className="institution-icon">🏛️</span>
                <p className="institution-name">{institution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="career-details-card career-path-card">
          <h2 className="card-title">Your Career Path</h2>
          <div className="career-path-timeline-detailed">
            {career.careerPath.map((step, index) => (
              <div key={index} className="career-path-step-detailed">
                <div className="step-number-detailed">{step.step}</div>
                <div className="step-content-detailed">
                  <h3 className="step-title-detailed">{step.title}</h3>
                  <p className="step-duration-detailed">{step.duration}</p>
                </div>
                {index < career.careerPath.length - 1 && (
                  <div className="step-connector"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerDetails

