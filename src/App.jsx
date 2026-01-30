import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Landing from './pages/Landing/Landing'
import HowItWorks from './pages/HowItWorks/HowItWorks'
import ExploreBranches from './pages/ExploreBranches/ExploreBranches'
import CareerPaths from './pages/CareerPaths/CareerPaths'
import Roadmaps from './pages/Roadmaps/Roadmaps'
import Resources from './pages/Resources/Resources'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import AuthForm from './pages/AuthForm/AuthForm'
import ProfilePending from './pages/ProfilePending/ProfilePending'
import ProfileForm from './pages/ProfileForm/ProfileForm'
import Dashboard from './pages/Dashboard/Dashboard'
import CareerDetails from './pages/CareerDetails/CareerDetails'

function AppContent() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    // Check if profile is complete (in real app, this would come from backend)
    const isComplete = userData.profileComplete || false
    setProfileComplete(isComplete)
    // Load user profile if exists (in real app, from backend)
    if (isComplete && userData.profile) {
      setUserProfile(userData.profile)
    }
    // Navigate based on profile completion status
    if (isComplete) {
      navigate('/dashboard')
    } else {
      navigate('/profile-pending')
    }
  }

  const handleSignup = (userData) => {
    setUser(userData)
    setProfileComplete(false)
    navigate('/profile-pending')
  }

  const handleProfileComplete = (profileData) => {
    // Validate profile data
    if (!profileData || !profileData.stream || !profileData.goal) {
      console.error('Invalid profile data:', profileData)
      return
    }
    
    // Update all state - React will batch these updates
    // Update user with profile data
    setUser(prev => {
      if (prev) {
        return { ...prev, profile: profileData, profileComplete: true }
      }
      return prev
    })
    
    // Set profile state - these will be batched together
    setUserProfile(profileData)
    setProfileComplete(true)
  }

  return (
    <div className="App">
      <Navbar user={user} />
      <Routes>
        <Route path="/how-it-works" element={<ProtectedRoute user={user}><HowItWorks /></ProtectedRoute>} />
        <Route path="/branches" element={<ProtectedRoute user={user}><ExploreBranches /></ProtectedRoute>} />
        <Route path="/career-paths" element={<ProtectedRoute user={user}><CareerPaths /></ProtectedRoute>} />
        <Route path="/roadmaps" element={<ProtectedRoute user={user}><Roadmaps /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute user={user}><Resources /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute user={user}><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute user={user}><Contact /></ProtectedRoute>} />
        <Route path="/" element={<Landing />} />
        <Route 
          path="/auth" 
          element={
            <AuthForm 
              onLogin={handleLogin} 
              onSignup={handleSignup}
            />
          } 
        />
        <Route 
          path="/profile-pending" 
          element={
            user && !profileComplete ? (
              <ProfilePending />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/complete-profile" 
          element={
            user && !profileComplete ? (
              <ProfileForm onComplete={handleProfileComplete} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            user && profileComplete ? (
              <Dashboard userProfile={userProfile} />
            ) : user && !profileComplete ? (
              <Navigate to="/profile-pending" replace />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/career-details" 
          element={
            user && profileComplete ? (
              <CareerDetails />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } 
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

