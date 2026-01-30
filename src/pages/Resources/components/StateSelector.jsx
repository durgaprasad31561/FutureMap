import React from 'react'
import '../styles/StateSelector.css'

function StateSelector({ states, selectedState, onStateChange, onSearch, searchTerm }) {
  return (
    <div className="state-selector-wrapper">
      <div className="state-selector-container">
        <div className="state-selector-content">
          <h2>Find the Best Engineering Colleges in Your State</h2>
          <p className="subtitle">Explore top-ranked institutions, placements, and career opportunities</p>
          
          <div className="selector-controls">
            <div className="state-dropdown-wrapper">
              <label>Select State</label>
              <select 
                value={selectedState} 
                onChange={(e) => onStateChange(e.target.value)}
                className="state-dropdown"
              >
                <option value="">Choose a state...</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="search-wrapper">
              <label>Search Colleges</label>
              <input
                type="text"
                placeholder="Search by college name..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {selectedState && (
            <p className="state-info">
              Showing engineering colleges in <strong>{selectedState}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StateSelector
