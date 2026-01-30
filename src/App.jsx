import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
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
import authService from './services/authService'
import ProfilePending from './pages/ProfilePending/ProfilePending'
import ProfileForm from './pages/ProfileForm/ProfileForm'
import Dashboard from './pages/Dashboard/Dashboard'
import CareerDetails from './pages/CareerDetails/CareerDetails'
import RankPredictor from './pages/RankPredictor/RankPredictor'

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function AppContent() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  const handleLogin = async (userData) => {
    // call backend login
    try {
      const resp = await authService.login({ email: userData.email, password: userData.password })
      if (resp.ok) {
        // try to get name from response data; fallback to provided name or email local-part
        let name = userData.name || ''
        if (!name && resp.data && typeof resp.data === 'object') {
          name = resp.data.name || resp.data.username || resp.data.email || ''
        }
        if (!name && userData.email) {
          name = userData.email.split('@')[0]
        }

        const appUser = { email: userData.email, name, profileComplete: false }
        setUser(appUser)
        setProfileComplete(false)
        navigate('/profile-pending')
      } else {
        // fallback: still allow client-side demo login if backend not available
        if (resp.ok) {
          alert(resp.message)
        } else {
          alert('Login failed: ' + resp.message)
        }
      }
    } catch (err) {
      console.error(err)
      alert('Login error: ' + err.message)
    }
  }

  const handleSignup = async (userData) => {
    try {
      const resp = await authService.signup({ name: userData.name, email: userData.email, phone: userData.phone, password: userData.password })
      if (resp.ok) {
        let name = userData.name || ''
        if (!name && resp.data && typeof resp.data === 'object') {
          name = resp.data.name || resp.data.username || resp.data.email || ''
        }
        const appUser = { email: userData.email, name, profileComplete: false }
        setUser(appUser)
        setProfileComplete(false)
        navigate('/profile-pending')
      } else {
        if (resp.ok) {
          alert(resp.message)
        } else {
          alert('Signup failed: ' + resp.message)
        }
      }
    } catch (err) {
      console.error(err)
      alert('Signup error: ' + err.message)
    }
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
      <Navbar user={user} onLogout={() => setUser(null)} />
      <ScrollToTop />
      <Routes>
        <Route path="/how-it-works" element={<HowItWorks user={user} />} />
        <Route path="/branches" element={<ProtectedRoute user={user}><ExploreBranches /></ProtectedRoute>} />
        <Route path="/career-paths" element={<ProtectedRoute user={user}><CareerPaths profileComplete={profileComplete} /></ProtectedRoute>} />
        <Route path="/roadmaps" element={<ProtectedRoute user={user}><Roadmaps /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute user={user}><Resources /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute user={user}><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute user={user}><Contact /></ProtectedRoute>} />
        <Route path="/" element={<Landing user={user} />} />
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
            ) : user ? (
              <Navigate to="/complete-profile" replace />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route path="/rank-predictor" element={<RankPredictor user={user} />} />
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

