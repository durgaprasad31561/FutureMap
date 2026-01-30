import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthForm.css'

const AuthForm = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validatePhone = (phone) => {
    // Remove spaces, dashes, and parentheses
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    // Check if it's 10 digits starting with 6-9 (Indian mobile) or +91 followed by 10 digits
    if (cleaned.startsWith('+91')) {
      const withoutCountryCode = cleaned.substring(3)
      return /^[6-9]\d{9}$/.test(withoutCountryCode)
    }
    // 10 digits starting with 6-9 (Indian mobile format)
    return /^[6-9]\d{9}$/.test(cleaned) && cleaned.length === 10
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    // At least 1 uppercase, 1 lowercase, 1 special character, 1 digit
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    const hasDigit = /[0-9]/.test(password)
    
    return hasUpperCase && hasLowerCase && hasSpecialChar && hasDigit && password.length >= 6
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!isLogin) {
      // Name validation
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      }

      // Phone validation
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number (10 digits)'
      }

      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (!validatePassword(formData.password)) {
        const hasUpperCase = /[A-Z]/.test(formData.password)
        const hasLowerCase = /[a-z]/.test(formData.password)
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)
        const hasDigit = /[0-9]/.test(formData.password)
        const missing = []
        
        if (!hasUpperCase) missing.push('1 uppercase letter')
        if (!hasLowerCase) missing.push('1 lowercase letter')
        if (!hasSpecialChar) missing.push('1 special character')
        if (!hasDigit) missing.push('1 digit')
        if (formData.password.length < 6) missing.push('at least 6 characters')
        
        newErrors.password = `Password must contain: ${missing.join(', ')}`
      }

      // Retype password validation
      if (!formData.retypePassword) {
        newErrors.retypePassword = 'Please confirm your password'
      } else if (formData.password !== formData.retypePassword) {
        newErrors.retypePassword = 'Passwords do not match'
      }
    }

    // Email validation (for both login and signup)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation for login
    if (isLogin && !formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      id: Date.now(),
      profileComplete: false
    }

    if (isLogin) {
      onLogin(userData)
    } else {
      onSignup(userData)
    }
  }

  const handleToggle = () => {
    setIsLogin(!isLogin)
    // Clear form and errors when switching
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      retypePassword: ''
    })
    setErrors({})
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h2 className="auth-form-title">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="auth-form-subtitle">
          {isLogin 
            ? 'Login to continue your journey' 
            : 'Sign up to get started'}
        </p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'input-error' : ''}
                placeholder="Enter your phone number"
                maxLength="15"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder={isLogin ? "Enter your password" : "1 uppercase, 1 lowercase, 1 special char, 1 digit"}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="retypePassword">Retype Password</label>
              <input
                type="password"
                id="retypePassword"
                name="retypePassword"
                value={formData.retypePassword}
                onChange={handleChange}
                className={errors.retypePassword ? 'input-error' : ''}
                placeholder="Confirm your password"
              />
              {errors.retypePassword && <span className="error-message">{errors.retypePassword}</span>}
            </div>
          )}
          
          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-form-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              className="auth-toggle-btn"
              onClick={handleToggle}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthForm

