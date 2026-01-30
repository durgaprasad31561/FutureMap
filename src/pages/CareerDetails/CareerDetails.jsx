import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import branchesData from '../ExploreBranches/data/branches.json'
import './CareerDetails.css'

const CareerDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state || {}
  const branchId = state.branchId || null
  const [downloadMsg, setDownloadMsg] = useState('')

  // Debug log
  console.log('CareerDetails state:', state)
  console.log('CareerDetails branchId:', branchId)
  console.log('Available branches:', branchesData.branches.map(b => b.id))

  const branch = branchId ? branchesData.branches.find(b => b.id === branchId) : null

  console.log('Found branch:', branch)

  if (!branch) {
    return (
      <div className="career-details-container">
        <div className="cd-error">
          <h2>🚫 Roadmap Not Found</h2>
          <p>Please select a branch from the Career Paths page to view its detailed roadmap.</p>
          <button onClick={() => navigate('/career-paths')} className="cd-btn-primary">
            ← Back to Career Paths
          </button>
        </div>
      </div>
    )
  }

  const handleDownloadRoadmap = () => {
    const roadmapData = {
      title: `${branch.name} - Complete Professional Roadmap`,
      generatedDate: new Date().toLocaleDateString(),
      branch: {
        id: branch.id,
        name: branch.name,
        description: branch.description,
        salaryRange: branch.salaryRange,
        demandTrend: branch.demandTrend,
        codingIntensity: branch.codingIntensity,
        difficulty: branch.difficulty,
        topCompanies: branch.companies,
        topJobRoles: branch.jobRoles,
        coreSubjects: branch.subjects,
        skills: branch.skills
      },
      roadmap: branch.timeline.map(year => ({
        year: year.year,
        focus: year.focus,
        courses: year.subjects,
        projects: year.year >= 2 ? [`Mini-project ${year.year}`, 'Case study'] : [],
        internshipReady: year.year >= 3
      })),
      skillProgression: Object.entries(branch.radarSkills || {}).map(([skill, level]) => ({
        skill,
        targetLevel: level,
        timelineMonths: Math.ceil((level / 100) * 48)
      })),
      resources: {
        books: branch.subjects.slice(0, 3).map(s => `Standard textbook for ${s}`),
        online: ['Coursera', 'edX', 'Udacity', 'LinkedIn Learning'],
        communities: ['Reddit', 'Discord', 'GitHub']
      },
      placementPrep: {
        technicalSkills: branch.skills,
        interviewTopics: [`${branch.name} fundamentals`, 'System design', 'Problem solving'],
        companies: branch.companies
      }
    }
    const dataStr = JSON.stringify(roadmapData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${branch.name.replace(/\s+/g, '_')}_DetailedRoadmap.json`
    link.click()
    URL.revokeObjectURL(url)
    setDownloadMsg('✓ Roadmap downloaded successfully!')
    setTimeout(() => setDownloadMsg(''), 3000)
  }

  return (
    <div className="career-details-container">
      <header className="cd-header">
        <button onClick={() => navigate('/career-paths')} className="cd-back-btn">
          ← Back to Paths
        </button>
        <div className="cd-header-content">
          <h1>{branch.icon} {branch.name}</h1>
          <p>{branch.description}</p>
        </div>
      </header>

      {downloadMsg && (
        <div className="cd-message success">{downloadMsg}</div>
      )}

      <div className="cd-container">
        {/* Quick Stats */}
        <section className="cd-stats">
          <div className="cd-stat">
            <span className="cd-label">Salary Range</span>
            <span className="cd-value">{branch.salaryRange}</span>
          </div>
          <div className="cd-stat">
            <span className="cd-label">Market Demand</span>
            <span className="cd-value" style={{ color: '#10b981' }}>{branch.demandTrend}</span>
          </div>
          <div className="cd-stat">
            <span className="cd-label">Difficulty</span>
            <span className="cd-value">{branch.difficulty}/100</span>
          </div>
          <div className="cd-stat">
            <span className="cd-label">Coding Intensity</span>
            <span className="cd-value">{branch.codingIntensity}%</span>
          </div>
        </section>

        {/* 4-Year Comprehensive Roadmap */}
        <section className="cd-section cd-roadmap">
          <h2>📅 4-Year Professional Roadmap</h2>
          <div className="cd-timeline">
            {branch.timeline.map((year, idx) => (
              <div key={idx} className="cd-timeline-item">
                <div className="cd-timeline-marker">Year {year.year}</div>
                <div className="cd-timeline-content">
                  <h3>{year.focus}</h3>
                  <div className="cd-courses">
                    <strong>Core Courses:</strong>
                    <div className="cd-course-list">
                      {year.subjects.map((subj, i) => (
                        <span key={i} className="cd-course-tag">{subj}</span>
                      ))}
                    </div>
                  </div>
                  <div className="cd-activities">
                    {year.year === 1 && <p>✓ Build strong fundamentals • Join clubs & study groups</p>}
                    {year.year === 2 && <p>✓ Start mini-projects • Participate in hackathons • Look for internships</p>}
                    {year.year === 3 && <p>✓ Secure internship • Build portfolio projects • Network with professionals</p>}
                    {year.year === 4 && <p>✓ Complete capstone • Prepare for placements • Interview prep</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Subjects & Skills */}
        <section className="cd-section cd-two-col">
          <div className="cd-col">
            <h2>📚 Core Subjects to Master</h2>
            <ul className="cd-list">
              {branch.subjects.map((subj, i) => (
                <li key={i}>
                  <span className="cd-check">✓</span>
                  {subj}
                </li>
              ))}
            </ul>
          </div>
          <div className="cd-col">
            <h2>🎯 Key Professional Skills</h2>
            <ul className="cd-list">
              {branch.skills.map((skill, i) => (
                <li key={i}>
                  <span className="cd-check">✓</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Job Roles & Companies */}
        <section className="cd-section cd-two-col">
          <div className="cd-col">
            <h2>💼 Career Paths & Job Roles</h2>
            <div className="cd-roles">
              {branch.jobRoles.map((role, i) => (
                <div key={i} className="cd-role-card">
                  <span className="cd-role-icon">→</span>
                  {role}
                </div>
              ))}
            </div>
          </div>
          <div className="cd-col">
            <h2>🏢 Top Hiring Companies</h2>
            <div className="cd-companies">
              {branch.companies.map((company, i) => (
                <div key={i} className="cd-company-badge">{company}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Strategy */}
        <section className="cd-section cd-strategy">
          <h2>📖 How to Excel in This Stream</h2>
          <div className="cd-strategy-grid">
            <div className="cd-strategy-item">
              <h4>🧠 Deep Learning</h4>
              <p>Don't memorize—understand concepts deeply. Use active recall and spaced repetition.</p>
            </div>
            <div className="cd-strategy-item">
              <h4>⌚ Time Management</h4>
              <p>Allocate {Math.ceil(branch.difficulty / 2)}-10 hours/week for core subjects. Use Pomodoro technique.</p>
            </div>
            <div className="cd-strategy-item">
              <h4>🛠️ Hands-On Practice</h4>
              <p>Build 2-3 projects per year. Code/design daily. Create a GitHub portfolio.</p>
            </div>
            <div className="cd-strategy-item">
              <h4>🤝 Collaboration</h4>
              <p>Join study groups, attend seminars, participate in competitions and hackathons.</p>
            </div>
            <div className="cd-strategy-item">
              <h4>💻 Internships</h4>
              <p>Apply for internships from Year 2. Gain real-world experience and professional network.</p>
            </div>
            <div className="cd-strategy-item">
              <h4>📝 Continuous Improvement</h4>
              <p>Review progress every semester. Read research papers. Stay updated with industry trends.</p>
            </div>
          </div>
        </section>

        {/* Learning Resources */}
        <section className="cd-section cd-resources">
          <h2>📚 Recommended Learning Resources</h2>
          <div className="cd-res-grid">
            <div className="cd-res-card">
              <h3>📖 Standard Textbooks</h3>
              <ul>
                {branch.subjects.slice(0, 3).map((s, i) => (
                  <li key={i}>Standard textbook for {s}</li>
                ))}
              </ul>
            </div>
            <div className="cd-res-card">
              <h3>🌐 Free Platforms</h3>
              <ul>
                <li>GeeksforGeeks</li>
                <li>MIT OpenCourseWare</li>
                <li>YouTube Educational</li>
              </ul>
            </div>
            <div className="cd-res-card">
              <h3>💻 Paid Courses</h3>
              <ul>
                <li>Coursera Specializations</li>
                <li>Udacity Nanodegrees</li>
                <li>edX Professional</li>
              </ul>
            </div>
            <div className="cd-res-card">
              <h3>👥 Communities</h3>
              <ul>
                <li>Reddit communities</li>
                <li>Discord servers</li>
                <li>GitHub discussions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Placement Preparation */}
        <section className="cd-section cd-placement">
          <h2>🎯 Placement Preparation Strategy</h2>
          <div className="cd-placement-grid">
            <div className="cd-placement-item">
              <h4>Resume Building</h4>
              <ul>
                <li>Highlight GPA (if 3.5+)</li>
                <li>Showcase 3-4 best projects</li>
                <li>List internships and achievements</li>
                <li>Include relevant skills</li>
              </ul>
            </div>
            <div className="cd-placement-item">
              <h4>Technical Interviews</h4>
              <ul>
                <li>Master DSA & problem solving</li>
                <li>System design knowledge</li>
                <li>Domain-specific concepts</li>
                <li>Practice coding daily</li>
              </ul>
            </div>
            <div className="cd-placement-item">
              <h4>Networking</h4>
              <ul>
                <li>Attend tech conferences</li>
                <li>Connect with alumni</li>
                <li>Join professional groups</li>
                <li>Engage on LinkedIn</li>
              </ul>
            </div>
            <div className="cd-placement-item">
              <h4>Target Companies</h4>
              <ul>
                {branch.companies.slice(0, 4).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cd-cta">
          <h2>Ready to Start Your Journey?</h2>
          <p>Download this roadmap and follow it consistently for 4 years to excel in {branch.name}.</p>
          <div className="cd-cta-buttons">
            <button className="cd-btn-primary" onClick={handleDownloadRoadmap}>
              📥 Download Detailed Roadmap
            </button>
            <button className="cd-btn-secondary" onClick={() => navigate('/complete-profile', { state: { recommendedBranch: branch.id } })}>
              ➜ Start Your Profile
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CareerDetails

