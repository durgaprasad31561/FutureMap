import React from 'react'
import './SkillsRadar.css'

export default function SkillsRadar({ data }) {
  // Create SVG radar chart
  const size = 300
  const center = size / 2
  const radius = 100
  const levels = 5

  // Scale data to radius
  const angles = [0, 1, 2, 3, 4].map(i => (i / 5) * Math.PI * 2)
  const points = data.map((skill, idx) => ({
    ...skill,
    angle: angles[idx],
    x: center + (radius * (skill.value / 100)) * Math.cos(angles[idx] - Math.PI / 2),
    y: center + (radius * (skill.value / 100)) * Math.sin(angles[idx] - Math.PI / 2)
  }))

  // Generate polygon points
  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ')

  // Level circles
  const levelCircles = Array.from({ length: levels }).map((_, i) => {
    const r = (radius / levels) * (i + 1)
    return r
  })

  return (
    <div className="skills-radar">
      <div className="radar-container">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circles */}
          {levelCircles.map((r, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="rgba(124, 58, 237, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Radial lines */}
          {points.map((point, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x - (point.x - center) * (radius / 100)}
              y2={point.y - (point.y - center) * (radius / 100)}
              stroke="rgba(124, 58, 237, 0.1)"
              strokeWidth="1"
            />
          ))}

          {/* Data polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(124, 58, 237, 0.2)"
            stroke="#7c3aed"
            strokeWidth="2"
            className="radar-polygon"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#7c3aed"
                className="radar-point"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
                opacity="0.3"
                className="radar-point-ring"
              />
            </g>
          ))}

          {/* Labels */}
          {points.map((point, i) => {
            const labelDistance = radius + 40
            const labelX = center + labelDistance * Math.cos(point.angle - Math.PI / 2)
            const labelY = center + labelDistance * Math.sin(point.angle - Math.PI / 2)
            return (
              <g key={`label-${i}`}>
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="radar-label"
                >
                  {point.name}
                </text>
                <text
                  x={labelX}
                  y={labelY + 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="radar-value"
                >
                  {point.value}%
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="radar-legend">
        {data.map((skill, idx) => (
          <div key={idx} className="legend-item">
            <span className="legend-dot" style={{
              background: `rgba(124, 58, 237, ${0.3 + (skill.value / 100) * 0.7})`
            }} />
            <span className="legend-name">{skill.name}</span>
            <span className="legend-value">{skill.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
