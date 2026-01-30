import React, { useState, useMemo, useEffect } from 'react'
import StateSelector from './components/StateSelector'
import CollegeCard from './components/CollegeCard'
import CollegeDetail from './components/CollegeDetail'
import CompareColleges from './components/CompareColleges'
import collegeAPI from '../../services/collegeAPI'
import './Resources.css'

function Resources() {
  const [colleges, setColleges] = useState([])
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedState, setSelectedState] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [compareColleges, setCompareColleges] = useState([])
  const [sortBy, setSortBy] = useState('rank')
  const [filterType, setFilterType] = useState('all')

  // Load colleges and states from API on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [collegesData, statesData] = await Promise.all([
          collegeAPI.fetchAllColleges(),
          collegeAPI.fetchAllStates()
        ])
        setColleges(collegesData)
        setStates(statesData)
        setError(null)
      } catch (err) {
        console.error('Failed to load data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter colleges based on state and search
  const filteredColleges = useMemo(() => {
    let result = [...colleges]

    // Filter by state
    if (selectedState) {
      result = result.filter(c => c.state === selectedState)
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by college type
    if (filterType !== 'all') {
      result = result.filter(c => c.type === filterType)
    }

    // Sort
    if (sortBy === 'rank') {
      result.sort((a, b) => a.nirf_rank - b.nirf_rank)
    } else if (sortBy === 'package') {
      result.sort((a, b) => {
        const aPkg = parseFloat(a.streams[0]?.avg_package?.split(' ')[0] || 0)
        const bPkg = parseFloat(b.streams[0]?.avg_package?.split(' ')[0] || 0)
        return bPkg - aPkg
      })
    } else if (sortBy === 'fees') {
      result.sort((a, b) => a.fees.total_annual - b.fees.total_annual)
    }

    return result
  }, [colleges, selectedState, searchTerm, filterType, sortBy])

  const handleCompareCollege = (college) => {
    if (compareColleges.find(c => c.id === college.id)) {
      // Remove if already selected
      setCompareColleges(compareColleges.filter(c => c.id !== college.id))
    } else {
      // Add if not at max (3 colleges)
      if (compareColleges.length < 3) {
        setCompareColleges([...compareColleges, college])
      }
    }
  }

  const handleRemoveFromCompare = (collegeId) => {
    setCompareColleges(compareColleges.filter(c => c.id !== collegeId))
  }

  if (loading) {
    return (
      <div className="resources-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading colleges data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="resources-page">
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="resources-page">
      {/* Hero & State Selector */}
      <StateSelector
        states={states}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />

      {/* Main Content */}
      <div className="resources-container">
        {selectedState && (
          <>
            {/* Filters & Sorting */}
            <div className="filters-section">
              <div className="filter-group">
                <label>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="rank">NIRF Ranking</option>
                  <option value="package">Average Package</option>
                  <option value="fees">Annual Fees</option>
                </select>
              </div>

              <div className="filter-group">
                <label>College Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Types</option>
                  <option value="Government">Government Only</option>
                  <option value="Private">Private Only</option>
                </select>
              </div>

              {compareColleges.length > 0 && (
                <div className="compare-indicator">
                  <span>{compareColleges.length}/3 colleges selected for comparison</span>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="results-info">
              <p>Found <strong>{filteredColleges.length}</strong> engineering colleges in {selectedState}</p>
            </div>

            {/* Colleges Grid */}
            {filteredColleges.length > 0 ? (
              <div className="colleges-grid">
                {filteredColleges.map(college => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                    onViewDetails={() => setSelectedCollege(college)}
                    isSelected={compareColleges.find(c => c.id === college.id) !== undefined}
                    onToggleCompare={handleCompareCollege}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No colleges found matching your criteria. Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        )}

        {!selectedState && (
          <div className="empty-state">
            <div className="empty-icon">🏫</div>
            <h2>Select a state to begin</h2>
            <p>Choose your preferred state from the dropdown above to explore engineering colleges</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedCollege && (
        <CollegeDetail
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
          onCompare={handleCompareCollege}
          isSelected={compareColleges.find(c => c.id === selectedCollege.id) !== undefined}
        />
      )}

      {/* Compare Panel */}
      {compareColleges.length > 0 && (
        <CompareColleges
          colleges={compareColleges}
          onRemoveCollege={handleRemoveFromCompare}
          onClose={() => setCompareColleges([])}
        />
      )}
    </div>
  )
}

export default Resources
