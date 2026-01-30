import React, { useMemo } from 'react'
import './DemandHeatmap.css'

export default function DemandHeatmap({ branches }) {
  const sectors = ['AI & ML', 'EV Tech', 'Semiconductors', 'Space Tech', 'Green Energy']

  // Generate sample demand data (in real app, this would come from branches.json)
  const demandData = useMemo(() => {
    const data = {}
    branches.forEach(branch => {
      data[branch.id] = sectors.map(sector => ({
        sector,
        value: Math.floor(Math.random() * 100) + 20 // 20-120 to ensure visibility
      }))
    })
    return data
  }, [branches])

  const getColor = (value) => {
    if (value < 30) return 'rgba(209, 213, 219, 0.5)'
    if (value < 50) return 'rgba(96, 165, 250, 0.3)'
    if (value < 70) return 'rgba(59, 130, 246, 0.5)'
    if (value < 85) return 'rgba(124, 58, 237, 0.6)'
    return 'rgba(124, 58, 237, 0.9)'
  }

  const getTextColor = (value) => {
    if (value < 70) return '#374151'
    return '#ffffff'
  }

  return (
    <div className="demand-heatmap">
      <div className="heatmap-container">
        <div className="heatmap-table">
          <div className="heatmap-header">
            <div className="heatmap-label">Branch</div>
            {sectors.map(sector => (
              <div key={sector} className="heatmap-sector-header">
                {sector}
              </div>
            ))}
          </div>

          {branches.map((branch, idx) => (
            <div key={branch.id} className="heatmap-row">
              <div className="heatmap-branch-name">
                <span className="branch-icon">{branch.icon}</span>
                <span>{branch.name}</span>
              </div>
              {demandData[branch.id].map((item, sidx) => (
                <div
                  key={sidx}
                  className="heatmap-cell"
                  style={{ backgroundColor: getColor(item.value) }}
                  title={`${item.sector} demand for ${branch.name}: ${item.value}%`}
                >
                  <span style={{ color: getTextColor(item.value) }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="heatmap-legend">
        <div className="legend-title">Demand Scale</div>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-box" style={{ backgroundColor: 'rgba(209, 213, 219, 0.5)' }} />
            <span>Low (0-30%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-box" style={{ backgroundColor: 'rgba(96, 165, 250, 0.3)' }} />
            <span>Moderate (30-50%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-box" style={{ backgroundColor: 'rgba(59, 130, 246, 0.5)' }} />
            <span>High (50-70%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-box" style={{ backgroundColor: 'rgba(124, 58, 237, 0.6)' }} />
            <span>Very High (70-85%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-box" style={{ backgroundColor: 'rgba(124, 58, 237, 0.9)' }} />
            <span>Critical (85%+)</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="heatmap-insights">
        <h3>📊 Market Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <span className="insight-icon">🚀</span>
            <h4>Hottest Sectors</h4>
            <p>AI & ML and Semiconductors show the highest demand across most branches</p>
          </div>
          <div className="insight-card">
            <span className="insight-icon">📈</span>
            <h4>Growth Opportunities</h4>
            <p>Green Energy and Space Tech sectors are emerging rapidly</p>
          </div>
          <div className="insight-card">
            <span className="insight-icon">🎯</span>
            <h4>Strategic Alignment</h4>
            <p>Choose a branch with high demand in your interested sector</p>
          </div>
        </div>
      </div>
    </div>
  )
}
