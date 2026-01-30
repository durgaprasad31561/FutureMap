import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FutureMap
        </Link>
        <div className="navbar-links">
          {user ? (
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/auth" className="navbar-link">
                Login
              </Link>
              <Link to="/auth" className="navbar-link navbar-link-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

