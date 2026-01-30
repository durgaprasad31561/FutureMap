import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ user, children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      // Show alert and redirect after a short delay
      const timer = setTimeout(() => {
        alert('Please login to access this page')
        navigate('/auth', { replace: true })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [user, navigate])

  // If user not logged in, show nothing (will redirect)
  if (!user) {
    return null
  }

  // User is logged in, render the page
  return children
}

export default ProtectedRoute
