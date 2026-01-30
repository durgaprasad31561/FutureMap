import React, { useState } from 'react'
import './RankPredictor.css'
import cutoffs from '../../data/cutoffs'
import collegesData from '../Resources/data/colleges.json'
import predictService from '../../services/predictService'

function computeChance(rank, closingRank) {
  if (!closingRank || closingRank <= 0) return 5
  const ratio = rank / closingRank
  let chance = 5
  if (ratio <= 1) {
    chance = Math.round(80 + (1 - ratio) * 20)
  } else if (ratio <= 1.5) {
    chance = Math.round(50 - ((ratio - 1) / 0.5) * 30)
  } else {
    chance = Math.max(3, Math.round(15 - ((ratio - 1.5) / 4) * 10))
  }
  return Math.max(3, Math.min(98, chance))
}

function findPredictions({ rank, branch, state }) {
  const r = Number(rank) || Infinity
  const branchNorm = (branch || '').toLowerCase()
  const stateNorm = (state || '').toLowerCase()

  const matches = []
  for (const c of cutoffs) {
    if (branchNorm && !c.branch.toLowerCase().includes(branchNorm) && !branchNorm.includes(c.branch.toLowerCase())) continue
    if (c.state !== 'All' && stateNorm && c.state.toLowerCase() !== stateNorm) continue

    const college = (collegesData && collegesData.colleges || []).find(x => x.id === c.collegeId)
    if (!college) continue

    const closing = Number(c.closingRank) || Infinity
    const est = computeChance(r, closing)

    matches.push({
      collegeId: college.id,
      college: college.name,
      branch: c.branch,
      state: college.state || c.state,
      closingRank: closing,
      estChance: est,
    })
  }

  matches.sort((a, b) => b.estChance - a.estChance || a.closingRank - b.closingRank)
  return matches.slice(0, 12)
}

export default function RankPredictor({ user }) {
  const [form, setForm] = useState({ exam: 'JEE Main', rank: '', state: '', branch: '' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)

    try {
      // Try backend first
      const resp = await predictService.predictRank(form)
      if (resp && resp.ok && resp.data) {
        // Expect backend to return an array of predictions
        setResults(Array.isArray(resp.data) ? resp.data : [])
      } else {
        // fallback to local cutoffs if backend unavailable
        const res = findPredictions(form)
        await new Promise((r) => setTimeout(r, 200))
        setResults(res)
      }
    } catch (err) {
      console.error(err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rm-predictor-page">
      <div className="rm-container">
        <h1>Rank Predictor</h1>
        <p className="rm-sub">Enter your exam rank to see a quick, frontend-only estimate.</p>

        <form className="rm-form" onSubmit={handleSubmit}>
          <label>
            Exam
            <select name="exam" value={form.exam} onChange={handleChange}>
              <option>JEE Main</option>
              <option>JEE Advanced</option>
              <option>GATE</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Rank
            <input name="rank" type="number" value={form.rank} onChange={handleChange} placeholder="Enter your rank" />
          </label>

          <label>
            State (optional)
            <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
          </label>

          <label>
            Preferred branch (optional)
            <input name="branch" value={form.branch} onChange={handleChange} placeholder="e.g., Computer Science" />
          </label>

          <div className="rm-actions">
            <button type="submit" className="rm-btn" disabled={loading}>
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </div>
        </form>

        <div className="rm-results">
          {!results && !loading && <div className="rm-hint">Submit your rank to see predictions.</div>}

          {results && (
            <div>
              <h2>Top matches</h2>
              <ul>
                {results.map((r, i) => (
                  <li key={i} className="rm-result-item">
                    <div className="rm-result-left">
                      <strong>{r.college}</strong>
                      <div className="rm-branch">{r.branch}</div>
                    </div>
                    <div className="rm-result-right">
                      <div className="rm-percent">{r.estChance}%</div>
                      <div className="rm-progress">
                        <div className="rm-progress-fill" style={{ width: `${r.estChance}%` }} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
