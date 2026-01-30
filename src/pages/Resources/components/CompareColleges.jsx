import React from 'react'
import '../styles/CompareColleges.css'

function CompareColleges({ colleges, onRemoveCollege, onClose }) {
  if (colleges.length === 0) return null

  // Get all unique streams from selected colleges
  const allStreams = [...new Set(colleges.flatMap(c => c.streams.map(s => s.stream)))]

  return (
    <div className="compare-panel" style={{ ['--college-count']: colleges.length }}>
      <div className="compare-header">
        <h2>Compare Colleges</h2>
        <button className="close-compare-btn" onClick={onClose}>✕</button>
      </div>

      <div className="compare-scroll">
        {/* College Headers */}
        <div className="compare-row headers">
          <div className="compare-label">Criteria</div>
          {colleges.map(college => (
            <div key={college.id} className="compare-cell">
              <div className="college-compare-header">
                <h4>{college.name}</h4>
                <button
                  className="remove-college-btn"
                  onClick={() => onRemoveCollege(college.id)}
                  title="Remove from comparison"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Type */}
        <div className="compare-row">
          <div className="compare-label">Type</div>
          {colleges.map(college => (
            <div key={college.id} className="compare-cell">
              <span className={`type-badge ${college.type.toLowerCase()}`}>{college.type}</span>
            </div>
          ))}
        </div>

        {/* NIRF Rank */}
        <div className="compare-row">
          <div className="compare-label">NIRF Rank</div>
          {colleges.map(college => (
            <div key={college.id} className="compare-cell">
              #{college.nirf_rank}
            </div>
          ))}
        </div>

        {/* Annual Fees */}
        <div className="compare-row">
          <div className="compare-label">Annual Fees</div>
          {colleges.map(college => (
            <div key={college.id} className="compare-cell">
              ₹{college.fees.total_annual.toLocaleString()}
            </div>
          ))}
        </div>

        {/* Tuition Only */}
        <div className="compare-row">
          <div className="compare-label">Tuition Only</div>
          {colleges.map(college => (
            <div key={college.id} className="compare-cell">
              ₹{college.fees.tuition_annual.toLocaleString()}
            </div>
          ))}
        </div>

        {/* Campus Size */}
        <div className="compare-row">
          <div className="compare-label">Campus Size</div>
          {colleges.map(college => (
            <div key={college.id} className="compare-cell">
              {college.campus_size_acres} acres
            </div>
          ))}
        </div>

        {/* Student Intake */}
        <div className="compare-row">
          <div className="compare-label">Student Intake</div>
          {colleges.map(college => (
            <div key={college.id} className="compare-cell">
              {college.student_intake}
            </div>
          ))}
        </div>

        {/* Stream-wise Stats */}
        {allStreams.map(stream => {
          const streamName = stream.split(' ')[0]
          return (
            <div key={`stream-${stream}`}>
              {/* Stream Header */}
              <div className="compare-row stream-header">
                <div className="compare-label">{streamName}</div>
                {colleges.map(college => {
                  const collegeStream = college.streams.find(s => s.stream === stream)
                  return (
                    <div key={college.id} className="compare-cell">
                      {collegeStream ? '✓' : '✗'}
                    </div>
                  )
                })}
              </div>

              {/* Avg Package */}
              <div className="compare-row">
                <div className="compare-label indent">Avg Package</div>
                {colleges.map(college => {
                  const collegeStream = college.streams.find(s => s.stream === stream)
                  return (
                    <div key={college.id} className="compare-cell">
                      {collegeStream ? collegeStream.avg_package : '-'}
                    </div>
                  )
                })}
              </div>

              {/* Highest Package */}
              <div className="compare-row">
                <div className="compare-label indent">Highest Package</div>
                {colleges.map(college => {
                  const collegeStream = college.streams.find(s => s.stream === stream)
                  return (
                    <div key={college.id} className="compare-cell">
                      {collegeStream ? collegeStream.highest_package : '-'}
                    </div>
                  )
                })}
              </div>

              {/* Placement % */}
              <div className="compare-row">
                <div className="compare-label indent">Placement %</div>
                {colleges.map(college => {
                  const collegeStream = college.streams.find(s => s.stream === stream)
                  return (
                    <div key={college.id} className="compare-cell">
                      {collegeStream ? `${collegeStream.placement_percent}%` : '-'}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Latest Placement Year */}
        {colleges.some(c => Object.keys(c.placements_data || {}).length > 0) && (
          <>
            <div className="compare-row section-header">
              <div className="compare-label">Placements</div>
              {colleges.map(college => <div key={college.id} className="compare-cell"></div>)}
            </div>

            <div className="compare-row">
              <div className="compare-label indent">Avg Salary (Latest)</div>
              {colleges.map(college => {
                const latestYear = Object.keys(college.placements_data || {}).sort().reverse()[0]
                const data = latestYear ? college.placements_data[latestYear] : null
                return (
                  <div key={college.id} className="compare-cell">
                    {data ? data.avg_salary : '-'}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Facilities Count */}
        <div className="compare-row">
          <div className="compare-label">Facilities Count</div>
          {colleges.map(college => (
            <div key={college.id} className="compare-cell">
              {college.facilities.length}
            </div>
          ))}
        </div>
      </div>

      <div className="compare-footer">
        <p className="note">💡 Compare up to 3 colleges to make an informed decision</p>
      </div>
    </div>
  )
}

export default CompareColleges
