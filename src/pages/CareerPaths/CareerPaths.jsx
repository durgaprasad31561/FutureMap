import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import branchesData from '../ExploreBranches/data/branches.json'
import './CareerPaths.css'

export default function CareerPaths({ profileComplete }) {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state || {}
  const results = state.results || null
  const [downloadMessage, setDownloadMessage] = useState('')

  // Helper: college suggestions per branch (sample real institutions)
  const collegeMap = {
    cse: ["Indian Institute of Technology, Bombay", "Indian Institute of Technology, Madras", "IIIT Hyderabad", "National Institute of Technology, Trichy", "BITS Pilani"],
    ai_ds: ["Indian Institute of Science, Bangalore", "IIT Madras (AI Dept)", "IIIT Hyderabad", "IISC Bangalore - ML Lab", "IIT Kharagpur"],
    ece: ["IIT Bombay", "IIT Delhi", "IISC Bangalore", "IIIT Hyderabad", "NIT Tiruchirappalli"],
    mechanical: ["IIT Kharagpur", "IIT Madras", "IIT Bombay", "BITS Pilani", "IIT Delhi"],
    civil: ["IIT Roorkee", "IIT Bombay", "IIT Madras", "CEPT University", "IIT Kharagpur"],
    electrical: ["IIT Kanpur", "IIT Bombay", "IIT Kharagpur", "IIT Madras", "IIT Delhi"],
    aerospace: ["IIT Madras", "IIT Bombay", "IIT Kanpur", "IISc Bangalore", "Anna University"]
  }

  const getBranchById = (id) => branchesData.branches.find(b => b.id === id)

  // Generate downloadable roadmap
  const generateRoadmapJSON = (branch) => {
    const roadmapData = {
      title: `${branch.name} - Complete Study Roadmap`,
      generatedDate: new Date().toLocaleDateString(),
      branch: {
        id: branch.id,
        name: branch.name,
        description: branch.description,
        salaryRange: branch.salaryRange,
        demandTrend: branch.demandTrend,
        topCompanies: branch.companies,
        topJobRoles: branch.jobRoles
      },
      recommendedColleges: collegeMap[branch.id] || [],
      curriculum: branch.timeline.map((t, i) => ({
        year: t.year,
        focus: t.focus,
        courses: t.subjects,
        estimatedHoursPerWeek: 40,
        projectCount: t.year === 4 ? 2 : 1,
        internshipOpportunities: t.year >= 3
      })),
      skillsToAcquire: Object.entries(branch.radarSkills || {}).map(([skill, level]) => ({
        name: skill,
        proficiency: level + '%',
        estimatedMonths: Math.ceil((level / 100) * 48)
      })),
      studyResources: {
        books: {
          fundamentals: ["CLRS - Introduction to Algorithms", "Discrete Mathematics by K.P. Bogart"],
          coreCourses: branch.subjects.slice(0, 3).map((s, i) => `${s} - Standard Textbook ${i + 1}`),
          advancedTopics: ["Research Papers", "Industry White Papers", "Open-Source Projects"]
        },
        online: {
          freeResources: ["GeeksforGeeks", "Coursera (audit mode)", "MIT OpenCourseWare", "YouTube channels"],
          paidCourses: ["Udacity", "Coursera Specializations", "Edx"],
          communities: ["Reddit communities", "Discord servers", "GitHub discussions"]
        }
      },
      milestonesAndCheckpoints: [
        { semester: 2, goal: "Master fundamentals and score >75% in core subjects" },
        { semester: 4, goal: "Complete first specialization course and start mini-project" },
        { semester: 6, goal: "Secure internship, build portfolio with 2-3 projects" },
        { semester: 8, goal: "Complete capstone project, prepare for placements" }
      ],
      placementStrategy: {
        resume: "Highlight projects, internships, GPA (if >3.5), and leadership roles",
        interviews: "Practice DSA, system design, and domain-specific questions",
        networking: "Attend tech conferences, meetups, and connect with alumni",
        companies: branch.companies
      },
      timelineAndSchedule: {
        studyHoursPerWeek: Math.ceil(branch.difficulty / 2),
        projectAssignmentPerSemester: branch.difficulty > 80 ? 1 : 0.5,
        estimatedCompletionMonths: 48
      }
    }
    return roadmapData
  }

  const handleDownloadRoadmap = (branch) => {
    const roadmapData = generateRoadmapJSON(branch)
    const dataStr = JSON.stringify(roadmapData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${branch.name.replace(/\s+/g, '_')}_Roadmap.json`
    link.click()
    URL.revokeObjectURL(url)
    setDownloadMessage('✓ Roadmap downloaded! Use it as your personal study guide.')
    setTimeout(() => setDownloadMessage(''), 3000)
  }

  const handleDownloadAsText = (branch) => {
    const roadmapData = generateRoadmapJSON(branch)
    let textContent = `
=== ${roadmapData.title} ===
Generated: ${roadmapData.generatedDate}

BRANCH OVERVIEW
===============
${roadmapData.branch.name}
${roadmapData.branch.description}
Estimated Salary: ${roadmapData.branch.salaryRange}
Market Demand: ${roadmapData.branch.demandTrend}

TOP HIRING COMPANIES
${roadmapData.branch.topCompanies.map(c => `- ${c}`).join('\n')}

RECOMMENDED COLLEGES
${roadmapData.recommendedColleges.map(c => `- ${c}`).join('\n')}

4-YEAR CURRICULUM
${roadmapData.curriculum.map(y => `
Year ${y.year}: ${y.focus}
Courses: ${y.courses.join(', ')}
Study Hours/Week: ${y.estimatedHoursPerWeek}
Projects: ${y.projectCount}
Internship Opportunities: ${y.internshipOpportunities ? 'Yes' : 'No'}
`).join('\n')}

SKILLS TO ACQUIRE
${roadmapData.skillsToAcquire.map(s => `- ${s.name}: ${s.proficiency} (Est. ${s.estimatedMonths} months)`).join('\n')}

MILESTONES & CHECKPOINTS
${roadmapData.milestonesAndCheckpoints.map(m => `Semester ${m.semester}: ${m.goal}`).join('\n')}

PLACEMENT STRATEGY
- Resume: ${roadmapData.placementStrategy.resume}
- Interviews: ${roadmapData.placementStrategy.interviews}
- Networking: ${roadmapData.placementStrategy.networking}

RECOMMENDED RESOURCES
Free:
${roadmapData.studyResources.online.freeResources.map(r => `- ${r}`).join('\n')}

Paid:
${roadmapData.studyResources.online.paidCourses.map(r => `- ${r}`).join('\n')}

Communities:
${roadmapData.studyResources.online.communities.map(r => `- ${r}`).join('\n')}
    `
    const blob = new Blob([textContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${branch.name.replace(/\s+/g, '_')}_Roadmap.txt`
    link.click()
    URL.revokeObjectURL(url)
    setDownloadMessage('✓ Roadmap downloaded as text!')
    setTimeout(() => setDownloadMessage(''), 3000)
  }

  if (!results) {
    return (
      <main className="career-paths page">
        <div className="cp-container">
          <h1>Career Paths</h1>
          <p className="lead">Explore professional engineering career tracks, recommended colleges, sample curricula and industry alignment.</p>

          <section className="cp-grid">
            {branchesData.branches.map(b => (
              <article key={b.id} className="cp-card">
                <div className="cp-card-header">
                  <span className="cp-icon">{b.icon}</span>
                  <h3>{b.name}</h3>
                </div>
                <p className="cp-desc">{b.description}</p>
                <div className="cp-meta">Top Roles: {b.jobRoles.slice(0,3).join(', ')}</div>
                <button 
                  className="cp-btn" 
                  onClick={() => {
                    if (profileComplete) {
                      navigate('/career-details', { state: { branchId: b.id } })
                    } else {
                      navigate('/complete-profile', { state: { recommendedBranch: b.id, fromCareerPaths: true } })
                    }
                  }}
                >
                  {profileComplete ? 'View Detailed Roadmap' : '✓ Complete Profile First'}
                </button>
              </article>
            ))}
          </section>
        </div>
      </main>
    )
  }

  // When quiz results are present, pick top match and details
  const topId = results.topMatch
  const topBranch = getBranchById(topId) || branchesData.branches.find(b => b.short && b.short.toLowerCase().includes(String(topId).toLowerCase()))

  const recommendedColleges = topBranch ? (collegeMap[topBranch.id] || []) : []

  return (
    <main className="career-paths page">
      <div className="cp-container">
        <header className="cp-header">
          <div className="cp-title">
            <h1>🎯 Your Perfect Match Career Path</h1>
            <p className="lead">Based on your answers, {topBranch?.name} is your ideal engineering stream. Here's a comprehensive, structured roadmap to guide your 4-year journey.</p>
          </div>
        </header>

        {topBranch ? (
          <section className="cp-detail">
            <div className="cp-overview">
              <h2>{topBranch.icon} {topBranch.name}</h2>
              <p className="cp-desc">{topBranch.description}</p>
              <div className="cp-stats">
                <div>📊 Estimated Salary: <strong>{topBranch.salaryRange}</strong></div>
                <div>📈 Market Demand: <strong>{topBranch.demandTrend}</strong></div>
                <div>🏢 Top Companies: <strong>{topBranch.companies.slice(0, 3).join(', ')}...</strong></div>
              </div>
            </div>

            {downloadMessage && (
              <div className="cp-message" style={{ background: '#10b981', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                {downloadMessage}
              </div>
            )}

            <div className="cp-columns">
              <div className="cp-column">
                <h3>🎓 Recommended Colleges & Programs</h3>
                <ul className="cp-colleges">
                  {recommendedColleges.map((c, i) => (
                    <li key={i}><strong>{i + 1}.</strong> {c}</li>
                  ))}
                </ul>

                <h4>Why these colleges?</h4>
                <p>These institutions have excellent placement records, strong faculty, well-equipped labs, and industry partnerships aligned with {topBranch.name}. They offer:</p>
                <ul style={{ fontSize: '0.9rem', color: '#666' }}>
                  <li>✓ Rigorous core curriculum</li>
                  <li>✓ Research & development opportunities</li>
                  <li>✓ Industry internship programs</li>
                  <li>✓ Mentorship from experienced professionals</li>
                  <li>✓ Active alumni network</li>
                </ul>
              </div>

              <div className="cp-column">
                <h3>📚 Suggested 4-Year Study Plan</h3>
                <ol className="cp-curriculum">
                  {topBranch.timeline.map((t) => (
                    <li key={t.year}>
                      <strong>Year {t.year}: {t.focus}</strong>
                      <p style={{ fontSize: '0.9rem', margin: '0.5rem 0', color: '#555' }}>
                        {t.subjects.join(' • ')}
                      </p>
                    </li>
                  ))}
                </ol>

                <h4>📌 Key Activities Per Year</h4>
                <ul style={{ fontSize: '0.85rem', color: '#666' }}>
                  <li><strong>Year 1-2:</strong> Build strong fundamentals, join study groups, attend workshops</li>
                  <li><strong>Year 2-3:</strong> Start mini-projects, participate in hackathons, apply for internships</li>
                  <li><strong>Year 3-4:</strong> Complete capstone project, build portfolio, network with industry</li>
                  <li><strong>Ongoing:</strong> Read research papers, contribute to open-source (if applicable)</li>
                </ul>
              </div>
            </div>

            <div className="cp-study-guide">
              <h3>📖 How to Study Well & Stay on Track</h3>
              <div className="cp-guide-grid">
                <div className="cp-guide-item">
                  <h4>1️⃣ Active Learning</h4>
                  <p>Don't just read—solve problems, build projects, and teach others. Use the FEYNMAN technique to deepen understanding.</p>
                </div>
                <div className="cp-guide-item">
                  <h4>2️⃣ Structured Schedule</h4>
                  <p>Dedicate {Math.ceil(topBranch.difficulty / 2)}-10 hours/week to core subjects. Use time-blocking and avoid burnout with regular breaks.</p>
                </div>
                <div className="cp-guide-item">
                  <h4>3️⃣ Hands-On Projects</h4>
                  <p>Apply what you learn to real projects. Build a portfolio on GitHub. This is your best interview prep.</p>
                </div>
                <div className="cp-guide-item">
                  <h4>4️⃣ Industry Internships</h4>
                  <p>Secure internships starting Year 2. They accelerate learning and boost your resume significantly.</p>
                </div>
                <div className="cp-guide-item">
                  <h4>5️⃣ Peer Learning</h4>
                  <p>Join study groups, attend seminars, and collaborate on projects. Teaching others reinforces your own learning.</p>
                </div>
                <div className="cp-guide-item">
                  <h4>6️⃣ Regular Review</h4>
                  <p>Review your progress every semester. Adjust your strategy if needed and celebrate milestones.</p>
                </div>
              </div>
            </div>

            <div className="cp-resources">
              <h3>📚 Recommended Learning Resources</h3>
              <div className="cp-res-grid">
                <div>
                  <h4>📖 Books & Textbooks</h4>
                  <ul>
                    <li>Branch fundamentals textbooks</li>
                    <li>Research papers in specialized areas</li>
                    <li>Industry best practices guides</li>
                  </ul>
                </div>
                <div>
                  <h4>🌐 Free Online Platforms</h4>
                  <ul>
                    <li>GeeksforGeeks, MIT OpenCourseWare</li>
                    <li>Coursera (audit), edX, Khan Academy</li>
                    <li>YouTube educational channels</li>
                  </ul>
                </div>
                <div>
                  <h4>💻 Paid Quality Courses</h4>
                  <ul>
                    <li>Udacity Nanodegrees</li>
                    <li>Coursera Specializations</li>
                    <li>LinkedIn Learning</li>
                  </ul>
                </div>
                <div>
                  <h4>👥 Communities & Mentorship</h4>
                  <ul>
                    <li>Reddit communities (r/learnprogramming, etc.)</li>
                    <li>Discord servers by subject</li>
                    <li>Meetups & conferences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cp-actions">
              <div className="cp-download-group">
                <button className="cp-primary" onClick={() => handleDownloadAsText(topBranch)}>
                  📄 Download Roadmap as Text
                </button>
                <button className="cp-primary" onClick={() => handleDownloadRoadmap(topBranch)}>
                  📋 Download as Detailed JSON
                </button>
              </div>
              <button className="cp-secondary" onClick={() => navigate('/complete-profile', { state: { recommendedBranch: topBranch.id } })}>
                ➜ Start Your Personalized Learning Plan
              </button>
              <button className="cp-secondary" onClick={() => navigate('/career-paths')}>
                🔍 Explore Other Paths
              </button>
            </div>
          </section>
        ) : (
          <div className="cp-empty">No recommendation available. Please take the quiz again.</div>
        )}
      </div>
    </main>
  )
}
