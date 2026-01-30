import React, { useState } from 'react'
import StreamStats from './StreamStats'
import '../styles/CollegeDetail.css'

function CollegeDetail({ college, onClose, onCompare }) {
  const [selectedStream, setSelectedStream] = useState(college.streams[0]?.stream || '')
  const [showStreamStats, setShowStreamStats] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleDetailImageError = () => {
    setImgError(true)
  }

  const placementYears = Object.entries(college.placements_data || {})
    .sort((a, b) => b[0] - a[0])
    .slice(0, 3)

  return (
    <div className="college-detail-modal-overlay" onClick={onClose}>
      <div className="college-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} title="Close (press Escape)">✕</button>

        {/* Header */}
        <div className="detail-header">
          <div className="header-content">
            <div className="logo-section">
              {!imgError ? (
                <img src={college.logo} alt={college.name} className="detail-logo" onError={handleDetailImageError} />
              ) : (
                <div className="detail-logo-fallback">{college.name.split(' ')[0].charAt(0)}</div>
              )}
            </div>
            <div className="header-info">
              <h1>{college.name}</h1>
              <p className="location">{college.city}, {college.state}</p>
              <div className="header-badges">
                <span className={`type-badge ${college.type.toLowerCase()}`}>{college.type}</span>
                <span className="rank-badge">NIRF Rank: #{college.nirf_rank}</span>
                <span className="accred-badge">{college.accreditation}</span>
              </div>
            </div>
          </div>
          <button className="compare-btn" onClick={() => onCompare(college)}>
            + Compare
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="detail-scroll-container">
          {/* Overview Section */}
          <section className="detail-section overview">
            <h2>📊 Overview</h2>
            <div className="overview-grid">
              <div className="overview-item">
                <span className="label">Established</span>
                <span className="value">{college.established}</span>
              </div>
              <div className="overview-item">
                <span className="label">Campus Size</span>
                <span className="value">{college.campus_size_acres} acres</span>
              </div>
              <div className="overview-item">
                <span className="label">Annual Intake</span>
                <span className="value">{college.student_intake} students</span>
              </div>
              <div className="overview-item">
                <span className="label">Website</span>
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="value-link">Visit</a>
              </div>
            </div>
          </section>

          {/* Fees Section */}
          <section className="detail-section fees">
            <h2>💰 Fees & Financial Aid</h2>
            <div className="fees-grid">
              <div className="fee-item">
                <span className="label">Tuition (Annual)</span>
                <span className="value">₹{college.fees.tuition_annual.toLocaleString()}</span>
              </div>
              <div className="fee-item">
                <span className="label">Hostel (Annual)</span>
                <span className="value">₹{college.fees.hostel_annual.toLocaleString()}</span>
              </div>
              <div className="fee-item">
                <span className="label">Mess (Annual)</span>
                <span className="value">₹{college.fees.mess_annual.toLocaleString()}</span>
              </div>
              <div className="fee-item highlight">
                <span className="label">Total Annual</span>
                <span className="value">₹{college.fees.total_annual.toLocaleString()}</span>
              </div>
            </div>

            <div className="scholarships-info">
              <h3>Scholarships Available</h3>
              <ul className="scholarship-list">
                {Object.entries(college.scholarships || {}).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Streams Section */}
          <section className="detail-section streams">
            <h2>🎓 Programs Offered</h2>
            <div className="streams-selector">
              {college.streams.map((stream, idx) => (
                <button
                  key={idx}
                  className={`stream-btn ${selectedStream === stream.stream ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedStream(stream.stream)
                    setShowStreamStats(true)
                  }}
                >
                  {stream.stream.split(' ')[0]}
                  <span className="placement">{stream.placement_percent}%</span>
                </button>
              ))}
            </div>

            {showStreamStats && (
              <StreamStats
                college={college}
                selectedStream={selectedStream}
                onStreamChange={setSelectedStream}
                onClose={() => setShowStreamStats(false)}
              />
            )}
          </section>

          {/* Facilities Section */}
          <section className="detail-section facilities">
            <h2>🏢 Facilities</h2>
            <div className="facilities-grid">
              {college.facilities.map((facility, idx) => (
                <div key={idx} className="facility-item">
                  <span className="facility-icon">✓</span>
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Placements Section */}
          <section className="detail-section placements">
            <h2>📈 Placement Statistics</h2>
            <div className="placements-grid">
              {placementYears.map(([year, data]) => (
                <div key={year} className="placement-card">
                  <h3>{year}</h3>
                  <div className="placement-stat">
                    <span className="label">Avg Salary</span>
                    <span className="value">{data.avg_salary}</span>
                  </div>
                  <div className="placement-stat">
                    <span className="label">Highest</span>
                    <span className="value">{data.highest_salary}</span>
                  </div>
                  <div className="placement-stat">
                    <span className="label">Placement %</span>
                    <span className="value">{data.placement_percent}%</span>
                  </div>
                </div>
              ))}
            </div>

            {college.sector_distribution && (
              <div className="sector-info">
                <h3>Sector Distribution (Latest Year)</h3>
                <div className="sector-list">
                  {Object.entries(college.sector_distribution).map(([sector, percent]) => (
                    <div key={sector} className="sector-item">
                      <span className="sector-name">{sector}</span>
                      <div className="sector-bar">
                        <div className="sector-fill" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span className="sector-percent">{percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Resources Section */}
          <section className="detail-section resources">
            <h2>📚 Resources & Links</h2>
            <div className="resources-grid">
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="resource-link">
                🌐 Official Website
              </a>
              <a href="#" className="resource-link">
                📋 Admission Portal
              </a>
              <a href="#" className="resource-link">
                📖 Cutoff Info
              </a>
              <a href="#" className="resource-link">
                🏠 Hostel Rules
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CollegeDetail
