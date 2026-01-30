import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const NAV_ITEMS = [
  { name: 'Home', to: '/' },
  { name: 'How It Works', to: '/how-it-works' },
  { name: 'Explore Branches', to: '/branches' },
  { name: 'Career Paths', to: '/career-paths' },
  { name: 'Roadmaps', to: '/roadmaps' },
  { name: 'Resources', to: '/resources' },
]

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const drawerRef = useRef(null)

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
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

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
          <NavLink to="/auth" className={({ isActive }) => 'fm-btn fm-btn-outline' + (isActive ? ' active' : '')} aria-label="Login">
            Login
          </NavLink>
          <NavLink to="/auth" className="fm-btn fm-btn-primary" aria-label="Sign up">
            Sign Up
          </NavLink>
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
          <NavLink to="/auth" className="fm-btn fm-btn-outline" onClick={() => setOpen(false)}>
            Login
          </NavLink>
          <NavLink to="/auth" className="fm-btn fm-btn-primary" onClick={() => setOpen(false)}>
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

