import React from 'react'
import BranchCard from '../../components/BranchCard/BranchCard'
import { getRecommendations } from '../../data/careers'
import './Dashboard.css'

const Dashboard = ({ userProfile }) => {
  // Get personalized recommendations based on user profile
  const recommendations = React.useMemo(() => {
    if (!userProfile) return []
    try {
      return getRecommendations(userProfile)
    } catch (error) {
      console.error('Error getting recommendations:', error)
      return []
    }
  }, [userProfile])

  // Show loading state if profile is not yet available
  if (!userProfile) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-empty">
          <p>Loading your recommendations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Personalized Career Recommendations</h1>
        <p className="dashboard-subtitle">
          Based on your interests, skills, and academic background, here are the top career paths that match your profile
        </p>
      </div>

      {recommendations.length > 0 ? (
        <>
          <div className="dashboard-info">
            <p className="dashboard-info-text">
              We found <strong>{recommendations.length}</strong> career path{recommendations.length > 1 ? 's' : ''} that match your profile
            </p>
          </div>
          <div className="dashboard-grid">
            {recommendations.map((rec) => (
              <BranchCard
                key={rec.id}
                career={rec}
                matchPercentage={rec.matchScore}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="dashboard-empty">
          <p>No recommendations found. Please ensure you've selected your stream and at least some interests or skills.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard

