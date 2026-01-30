import React, { useState } from 'react'
import './BranchFinder.css'

export default function BranchFinder({ questions, branches, onQuizComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [sliderValues, setSliderValues] = useState({
    coding: 50,
    practical: 50
  })

  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    })
  }

  const handleSliderChange = (slider, value) => {
    setSliderValues({
      ...sliderValues,
      [slider]: value
    })
  }

  const calculateMatches = () => {
    const scores = {}

    branches.forEach(branch => {
      let score = 0

      // Weight-based scoring from quiz options
      Object.entries(answers).forEach(([questionId, selectedOptionIdx]) => {
        const question = questions.find(q => q.id === parseInt(questionId))
        if (question && question.options[selectedOptionIdx]) {
          const weights = question.options[selectedOptionIdx].weight || {}
          if (weights[branch.id]) {
            score += weights[branch.id]
          }
        }
      })

      // Slider-based adjustments
      const codingDiff = Math.abs(branch.codingIntensity - sliderValues.coding)
      const practicalDiff = Math.abs((branch.radarSkills?.Practical || 75) - sliderValues.practical)
      
      // Reward branches that match slider preferences (lower difference = higher bonus)
      if (codingDiff <= 20) {
        score += (20 - codingDiff) * 0.5
      }
      if (practicalDiff <= 20) {
        score += (20 - practicalDiff) * 0.5
      }

      scores[branch.id] = Math.min(100, Math.max(0, score))
    })

    const matches = branches
      .map(branch => ({
        id: branch.id,
        score: scores[branch.id]
      }))
      .sort((a, b) => b.score - a.score)

    return {
      topMatch: matches[0].id,
      topScore: matches[0].score,
      matches: matches.slice(0, 5),
      answers: answers,
      sliderValues: sliderValues
    }
  }

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length === questions.length) {
      const results = calculateMatches()
      onQuizComplete(results)
      setShowResults(true)
    }
  }

  const progress = (Object.keys(answers).length / questions.length) * 100

  if (showResults) {
    return (
      <div className="branch-finder-results">
        <div className="results-icon">✓</div>
        <h2>Quiz Completed!</h2>
        <p>Your personalized branch recommendations are ready. Check the top matches below.</p>
        <button
          className="results-btn"
          onClick={() => {
            setShowResults(false)
            setCurrentQuestion(0)
            setAnswers({})
          }}
        >
          Take Quiz Again
        </button>
      </div>
    )
  }

  return (
    <div className="branch-finder">
      <div className="finder-header">
        <h2>🎯 Find Your Perfect Branch</h2>
        <p>Answer a few questions to get personalized recommendations</p>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: progress + '%' }} />
        </div>
        <span className="progress-text">
          {Object.keys(answers).length} of {questions.length} answered
        </span>
      </div>

      <div className="quiz-content">
        {currentQuestion < questions.length && (
          <div className="quiz-question">
            <h3>{questions[currentQuestion].text}</h3>

            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  className={`quiz-option ${
                    answers[questions[currentQuestion].id] === idx ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswer(questions[currentQuestion].id, idx)}
                >
                  <span className="option-radio">
                    {answers[questions[currentQuestion].id] === idx && '●'}
                  </span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion === questions.length && (
          <div className="quiz-sliders">
            <h3>Fine-tune Your Preferences</h3>

            <div className="slider-group">
              <div className="slider-label">
                <span>Hardware-Focused</span>
                <span>Coding-Focused</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValues.coding}
                onChange={(e) => handleSliderChange('coding', parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-value">{sliderValues.coding}% Coding</div>
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>Theory-Heavy</span>
                <span>Practical-Heavy</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValues.practical}
                onChange={(e) => handleSliderChange('practical', parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-value">{sliderValues.practical}% Practical</div>
            </div>
          </div>
        )}
      </div>

      <div className="quiz-nav">
        <button
          className="quiz-nav-btn prev"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          ← Previous
        </button>

        <div className="quiz-steps">
          {Array.from({ length: questions.length + 1 }).map((_, idx) => (
            <div
              key={idx}
              className={`quiz-step ${idx === currentQuestion ? 'active' : ''} ${
                idx < currentQuestion ? 'completed' : ''
              }`}
              onClick={() => {
                if (idx <= currentQuestion) {
                  setCurrentQuestion(idx)
                }
              }}
            >
              {idx < currentQuestion ? '✓' : idx + 1}
            </div>
          ))}
        </div>

        {currentQuestion < questions.length ? (
          <button
            className="quiz-nav-btn next"
            disabled={answers[questions[currentQuestion].id] === undefined}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next →
          </button>
        ) : (
          <button
            className="quiz-nav-btn submit"
            onClick={handleSubmitQuiz}
          >
            Get Results →
          </button>
        )}
      </div>
    </div>
  )
}
