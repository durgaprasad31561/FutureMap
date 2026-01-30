import React, { useState } from 'react'
import './RankPredictor.css'

const mockPredict = (values) => {
  // Simple frontend-only stub: returns mock results based on rank
  const rank = Number(values.rank) || 999999
  let chance = 0
  if (rank <= 100) chance = 95
  else if (rank <= 1000) chance = 80
  else if (rank <= 5000) chance = 50
  else if (rank <= 20000) chance = 25
  else chance = 5

  return [
    { college: 'Example Institute of Tech', branch: values.branch || 'CSE', estChance: chance },
    { college: 'National College of Engineering', branch: values.branch || 'ECE', estChance: Math.max(chance - 10, 3) },
    { college: 'City College of Engineering', branch: values.branch || 'ME', estChance: Math.max(chance - 30, 1) },
  ]
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
      // Frontend-first stub: generate mock predictions
      const res = mockPredict(form)
      // simulate small delay
      await new Promise((r) => setTimeout(r, 300))
      setResults(res)
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
