import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

const NAV_ITEMS = [
  { name: 'Home', to: '/' },
  { name: 'How It Works', to: '/how-it-works' },
  { name: 'Explore Branches', to: '/branches' },
  { name: 'Career Paths', to: '/career-paths' },
  { name: 'Resources', to: '/resources' },
]

const Navbar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const drawerRef = useRef(null)
  const dropdownRef = useRef(null)

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Close on outside click for accessibility
  useEffect(() => {
    function handleClick(e) {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setOpen(false)
      }
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, dropdownOpen])

  const handleLogout = () => {
    alert('Successfully logged out')
    setDropdownOpen(false)
    if (onLogout) {
      onLogout()
    }
    navigate('/')
  }

  return (
    <nav className="fm-navbar" role="navigation" aria-label="Main navigation">
      <div className="fm-navbar-container">
        <Link to="/" className="fm-logo" aria-label="FutureMap home">
          <span className="fm-logo-mark">🗺️</span>
          <span className="fm-logo-text">FutureMap</span>
        </Link>

        <ul className="fm-navlinks">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'fm-navlink active' : 'fm-navlink')}
                aria-label={item.name}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="fm-actions">
          {user ? (
            <div className="fm-user-menu" ref={dropdownRef}>
              <button
                className="fm-user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
                aria-expanded={dropdownOpen}
              >
                <span className="fm-user-avatar">👤</span>
                <span className="fm-user-name">{user.name || 'User'}</span>
                <span className={`fm-dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
              </button>

              {dropdownOpen && (
                <div className="fm-dropdown-menu">
                  <div className="fm-dropdown-item fm-dropdown-header">
                    <strong>{user.name || 'User'}</strong>
                  </div>

                  <NavLink
                    to="/dashboard"
                    className="fm-dropdown-item fm-dropdown-link"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📊 Dashboard
                  </NavLink>

                  <div className="fm-dropdown-item fm-dropdown-progress">
                    <span>Progress:</span>
                    <div className="fm-progress-bar">
                      <div className="fm-progress-fill" style={{ width: '45%' }} />
                    </div>
                    <span className="fm-progress-text">45%</span>
                  </div>

                  <button
                    className="fm-dropdown-item fm-dropdown-logout"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/auth" className={({ isActive }) => 'fm-btn fm-btn-outline' + (isActive ? ' active' : '')} aria-label="Login">
              Login
            </NavLink>
          )}
        </div>

        <button
          className={`fm-hamburger ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="fm-mobile-drawer"
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="fm-mobile-drawer"
        className={`fm-mobile-drawer ${open ? 'open' : ''}`}
        ref={drawerRef}
        aria-hidden={!open}
      >
        <ul className="fm-mobile-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'fm-mobile-link active' : 'fm-mobile-link')}
                aria-label={item.name}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="fm-mobile-actions">
          {user ? (
            <div className="fm-mobile-user">
              <div className="fm-mobile-user-name">{user.name || 'User'}</div>
              <NavLink to="/dashboard" className="fm-btn fm-btn-outline" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
              <button className="fm-btn fm-btn-outline" onClick={handleLogout} style={{ width: '100%' }}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/auth" className="fm-btn fm-btn-outline" onClick={() => setOpen(false)}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

