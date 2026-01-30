import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ExploreBranches.css'
import BranchCard from './components/BranchCard'
import BranchFinder from './components/BranchFinder'
import ComparisonTool from './components/ComparisonTool'
import SkillsRadar from './components/SkillsRadar'
import Timeline from './components/Timeline'
import AlumniStories from './components/AlumniStories'
import DemandHeatmap from './components/DemandHeatmap'
import branchesData from './data/branches.json'

export default function ExploreBranches() {
  const navigate = useNavigate()
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [comparisonBranches, setComparisonBranches] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [quizResults, setQuizResults] = useState(null)

  const handleBranchSelect = (branchId) => {
    setSelectedBranch(branchId)
  }

  const handleCompare = (branchId) => {
    if (comparisonBranches.includes(branchId)) {
      setComparisonBranches(comparisonBranches.filter(id => id !== branchId))
    } else if (comparisonBranches.length < 3) {
      setComparisonBranches([...comparisonBranches, branchId])
    }
  }

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setSelectedBranch(results.topMatch)
    // Navigate to career paths page and pass results so CareerPaths can show a tailored plan
    try {
      navigate('/career-paths', { state: { results } })
    } catch (e) {
      // fallback: set internal state only
      console.warn('Navigation to /career-paths failed:', e)
    }
  }

  const selectedBranchData = selectedBranch
    ? branchesData.branches.find(b => b.id === selectedBranch)
    : null

  const comparisonData = branchesData.branches.filter(b =>
    comparisonBranches.includes(b.id)
  )

  return (
    <main className="explore-branches">
      {/* Hero */}
      <section className="eb-hero">
        <div className="eb-container">
          <h1>Discover Your Ideal Engineering Branch</h1>
          <p>Find the perfect specialization based on your interests, strengths, and career goals</p>
        </div>
      </section>

      {/* Branch Finder Quiz */}
      <section className="eb-finder">
        <div className="eb-container">
          <BranchFinder
            questions={branchesData.quizQuestions}
            branches={branchesData.branches}
            onQuizComplete={handleQuizComplete}
          />
        </div>
      </section>

      {/* Recommended Branches (if quiz completed) */}
      {quizResults && (
        <section className="eb-recommended">
          <div className="eb-container">
            <div className="eb-section-header">
              <h2>Your Top Matches</h2>
              <p>Based on your quiz results</p>
            </div>
            <div className="eb-recommended-cards">
              {quizResults.matches.map(match => {
                const branch = branchesData.branches.find(b => b.id === match.id)
                return (
                  <div key={match.id} className="eb-match-card">
                    <div className="eb-match-rank">#{quizResults.matches.indexOf(match) + 1}</div>
                    <div className="eb-match-score">{Math.round(match.score)}%</div>
                    <h3>{branch.name}</h3>
                    <p>{branch.description}</p>
                    <button
                      className="eb-match-btn"
                      onClick={() => handleBranchSelect(match.id)}
                    >
                      View Details
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Branch Details (Selected Branch) */}
      {selectedBranchData && (
        <section className="eb-details">
          <div className="eb-container">
            <div className="eb-detail-header">
              <span style={{ fontSize: '2.5rem' }}>{selectedBranchData.icon}</span>
              <div>
                <h2>{selectedBranchData.name}</h2>
                <p>{selectedBranchData.description}</p>
              </div>
            </div>

            <div className="eb-stats-grid">
              <div className="eb-stat">
                <span className="eb-stat-label">Coding Intensity</span>
                <div className="eb-progress-bar">
                  <div className="eb-progress-fill" style={{ width: selectedBranchData.codingIntensity + '%' }} />
                </div>
                <span className="eb-stat-value">{selectedBranchData.codingIntensity}%</span>
              </div>

              <div className="eb-stat">
                <span className="eb-stat-label">Difficulty Level</span>
                <div className="eb-progress-bar">
                  <div className="eb-progress-fill" style={{ width: selectedBranchData.difficulty + '%' }} />
                </div>
                <span className="eb-stat-value">{selectedBranchData.difficulty}/100</span>
              </div>

              <div className="eb-stat">
                <span className="eb-stat-label">Salary Range</span>
                <span className="eb-stat-value" style={{ fontSize: '1.2rem' }}>{selectedBranchData.salaryRange}</span>
              </div>

              <div className="eb-stat">
                <span className="eb-stat-label">Market Demand</span>
                <span className="eb-stat-value" style={{ color: '#10b981' }}>{selectedBranchData.demandTrend}</span>
              </div>
            </div>

            {/* Skills Radar */}
            <div className="eb-section-header" style={{ marginTop: '2rem' }}>
              <h3>Skills Proficiency</h3>
            </div>
            <SkillsRadar data={selectedBranchData.radarSkills} />

            {/* Timeline */}
            <div className="eb-section-header" style={{ marginTop: '2rem' }}>
              <h3>4-Year Engineering Journey</h3>
            </div>
            <Timeline timeline={selectedBranchData.timeline} />

            {/* Core Subjects */}
            <div className="eb-subjects">
              <h3>Core Subjects</h3>
              <div className="eb-subject-list">
                {selectedBranchData.subjects.map((subject, idx) => (
                  <div key={idx} className="eb-subject-tag">{subject}</div>
                ))}
              </div>
            </div>

            {/* Job Roles */}
            <div className="eb-jobs">
              <h3>Career Paths</h3>
              <div className="eb-roles-grid">
                {selectedBranchData.jobRoles.map((role, idx) => (
                  <div key={idx} className="eb-role-card">
                    <span className="eb-role-icon">💼</span>
                    <p>{role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Companies */}
            <div className="eb-companies">
              <h3>Top Hiring Companies</h3>
              <div className="eb-companies-grid">
                {selectedBranchData.companies.map((company, idx) => (
                  <div key={idx} className="eb-company-badge">{company}</div>
                ))}
              </div>
            </div>

            {/* Compare Button */}
            <button
              className="eb-compare-btn"
              onClick={() => {
                handleCompare(selectedBranchData.id)
                setShowComparison(true)
              }}
            >
              {comparisonBranches.includes(selectedBranchData.id) ? '✓ Added to Compare' : '+ Add to Compare'}
            </button>
          </div>
        </section>
      )}

      {/* All Branches Grid */}
      <section className="eb-branches">
        <div className="eb-container">
          <div className="eb-section-header">
            <h2>All Engineering Branches</h2>
            <p>Explore in detail or compare your top choices</p>
          </div>

          <div className="eb-branches-grid">
            {branchesData.branches.map(branch => (
              <BranchCard
                key={branch.id}
                branch={branch}
                isSelected={selectedBranch === branch.id}
                isComparing={comparisonBranches.includes(branch.id)}
                onSelect={() => handleBranchSelect(branch.id)}
                onCompare={() => handleCompare(branch.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Tool */}
      {showComparison && comparisonData.length > 0 && (
        <section className="eb-comparison">
          <div className="eb-container">
            <div className="eb-section-header">
              <h2>Branch Comparison</h2>
              <button
                className="eb-close-comparison"
                onClick={() => {
                  setShowComparison(false)
                  setComparisonBranches([])
                }}
              >
                Close ✕
              </button>
            </div>
            <ComparisonTool branches={comparisonData} />
          </div>
        </section>
      )}

      {/* Demand Heatmap */}
      <section className="eb-heatmap">
        <div className="eb-container">
          <div className="eb-section-header">
            <h2>Industry Demand Hotspots</h2>
            <p>Current and emerging opportunities in the market</p>
          </div>
          <DemandHeatmap branches={branchesData.branches} />
        </div>
      </section>

      {/* Alumni Stories */}
      <section className="eb-alumni">
        <div className="eb-container">
          <div className="eb-section-header">
            <h2>Success Stories</h2>
            <p>See where alumni from each branch have reached</p>
          </div>
          <AlumniStories stories={branchesData.alumniStories} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="eb-cta">
        <div className="eb-container">
          <h2>Ready to Start Your Engineering Journey?</h2>
          <p>Download your personalized roadmap and connect with mentors</p>
          <div className="eb-cta-buttons">
            <button className="eb-cta-btn eb-cta-primary">📥 Download Roadmap PDF</button>
            <button className="eb-cta-btn eb-cta-secondary">👥 Talk to a Mentor</button>
          </div>
        </div>
      </section>
    </main>
  )
}
