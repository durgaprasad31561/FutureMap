import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfileForm.css'

const ProfileForm = ({ onComplete }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    stream: '',
    favoriteSubjects: [],
    interests: [],
    skills: [],
    goal: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'Computer Science', 'English', 'Economics', 'Commerce'
  ]

  const interests = [
    'Coding', 'Robotics', 'Design', 'Construction', 'Research'
  ]

  const skills = [
    'Problem Solving', 'Analytical Thinking', 'Creativity', 
    'Communication', 'Leadership', 'Teamwork', 'Technical Skills'
  ]

  const handleStreamChange = (e) => {
    setFormData({ ...formData, stream: e.target.value })
  }

  const handleSubjectToggle = (subject) => {
    const updated = formData.favoriteSubjects.includes(subject)
      ? formData.favoriteSubjects.filter(s => s !== subject)
      : [...formData.favoriteSubjects, subject]
    setFormData({ ...formData, favoriteSubjects: updated })
  }

  const handleInterestToggle = (interest) => {
    const updated = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest]
    setFormData({ ...formData, interests: updated })
  }

  const handleSkillToggle = (skill) => {
    const updated = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill]
    setFormData({ ...formData, skills: updated })
  }

  const handleGoalChange = (e) => {
    setFormData({ ...formData, goal: e.target.value })
    // Clear error when user makes selection
    if (errors.goal) {
      setErrors(prev => ({ ...prev, goal: '' }))
    }
  }


  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.stream) {
      newErrors.stream = 'Please select your stream'
    }
    
    if (!formData.goal) {
      newErrors.goal = 'Please select your career goal'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form and get errors synchronously
    const newErrors = {}
    if (!formData.stream) {
      newErrors.stream = 'Please select your stream'
    }
    if (!formData.goal) {
      newErrors.goal = 'Please select your career goal'
    }
    
    setErrors(newErrors)
    
    // If validation fails, scroll to first error
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0]
      let element = null
      
      if (firstErrorKey === 'stream') {
        element = document.querySelector('.form-select')
      } else if (firstErrorKey === 'goal') {
        element = document.querySelector('input[name="goal"]:not(:checked)') || 
                 document.querySelector('.radio-group')
      }
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => element.focus(), 100)
      }
      return
    }
    
    // Validation passed - proceed with submission
    setIsSubmitting(true)
    
    try {
      // Call onComplete to update parent state first
      // This updates the App component's state (user, profileComplete, userProfile)
      onComplete(formData)
      
      // Navigate to dashboard after a brief delay to ensure state updates
      // React batches state updates, so we give it time to process
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 150)
    } catch (error) {
      console.error('Error submitting profile:', error)
      setIsSubmitting(false)
      setErrors({ submit: 'Failed to submit profile. Please try again.' })
    }
  }

  return (
    <div className="profile-form-container">
      <div className="profile-form-wrapper">
        <h2 className="profile-form-title">Complete Your Profile</h2>
        <p className="profile-form-subtitle">
          Help us understand you better to provide personalized recommendations
        </p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <label className="form-section-label">Stream *</label>
            <select
              value={formData.stream}
              onChange={handleStreamChange}
              className={`form-select ${errors.stream ? 'input-error' : ''}`}
              required
            >
              <option value="">Select your stream</option>
              <option value="MPC">MPC (Maths, Physics, Chemistry)</option>
              <option value="BiPC">BiPC (Biology, Physics, Chemistry)</option>
              <option value="MEC">MEC (Maths, Economics, Commerce)</option>
            </select>
            {errors.stream && <span className="error-message">{errors.stream}</span>}
          </div>

          <div className="form-section">
            <label className="form-section-label">Favorite Subjects</label>
            <div className="checkbox-group">
              {subjects.map(subject => (
                <label key={subject} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.favoriteSubjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-section-label">Interests</label>
            <div className="checkbox-group">
              {interests.map(interest => (
                <label key={interest} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-section-label">Skills</label>
            <div className="checkbox-group">
              {skills.map(skill => (
                <label key={skill} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-section-label">Goal *</label>
            <div className={`radio-group ${errors.goal ? 'has-error' : ''}`}>
              <label className="radio-item">
                <input
                  type="radio"
                  name="goal"
                  value="Placements"
                  checked={formData.goal === 'Placements'}
                  onChange={handleGoalChange}
                  required
                />
                <span>Placements</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="goal"
                  value="Higher Studies"
                  checked={formData.goal === 'Higher Studies'}
                  onChange={handleGoalChange}
                />
                <span>Higher Studies</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="goal"
                  value="Startup"
                  checked={formData.goal === 'Startup'}
                  onChange={handleGoalChange}
                />
                <span>Startup</span>
              </label>
            </div>
            {errors.goal && <span className="error-message">{errors.goal}</span>}
          </div>

          {errors.submit && (
            <div className="form-section">
              <span className="error-message" style={{ display: 'block', textAlign: 'center' }}>
                {errors.submit}
              </span>
            </div>
          )}

          <button 
            type="submit" 
            className="profile-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm

