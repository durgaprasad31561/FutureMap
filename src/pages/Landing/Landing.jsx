import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <div className="landing-hero">
        <h1 className="landing-title">Find Your Ideal Career Path</h1>
        <p className="landing-subtitle">
          Get personalized career and education recommendations based on your interests, skills, and academic background. Make informed decisions for your future.
        </p>
        <div className="landing-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/auth')}
          >
            Sign Up
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/auth')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing

