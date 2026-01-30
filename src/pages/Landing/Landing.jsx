import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = ({ user }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <div className="landing">
      <div className="landing-hero" role="banner">
        <div className="landing-blobs" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        <div className="landing-content">
          <h1 className="landing-title">Find Your Ideal Career Path</h1>
          <p className="landing-subtitle">
            FutureMap helps students and early-career professionals discover strength-aligned career paths,
            step-by-step roadmaps, and actionable learning plans — tailored to your skills, interests and
            academic background.
          </p>

          <div className="landing-buttons">
            {user ? (
              <>
                <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Dashboard</button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/auth')}
                  aria-label="Sign up"
                >
                  Sign Up
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate('/auth')}
                  aria-label="Login"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>

        <div className="landing-cta" aria-hidden="true">
          <div className="stat">
            <strong>120+</strong>
            <span>Career Paths</span>
          </div>
          <div className="stat">
            <strong>500+</strong>
            <span>Roadmap Steps</span>
          </div>
          <div className="stat">
            <strong>98%</strong>
            <span>Student Satisfaction</span>
          </div>
        </div>
      </div>

      <section className="landing-features" aria-label="Features">
        <div className="feature">
          <div className="feature-icon">🎯</div>
          <h3>Personalized Matches</h3>
          <p>AI-driven career matches based on your profile, strengths and interests.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🗺️</div>
          <h3>Actionable Roadmaps</h3>
          <p>Clear multi-step roadmaps with milestones, skills and recommended resources.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">⚙️</div>
          <h3>Skill Builders</h3>
          <p>Curated learning modules and projects to build job-ready skills quickly.</p>
        </div>
      </section>

      <section className="landing-branches" aria-label="Explore branches">
        <div className="branches-inner">
          <h2>Featured Branches</h2>
          <p className="branches-intro">Explore a few popular branches to see suggested paths and skills.</p>

          <div className="branches-grid">
            <article className="branch-card">
              <h4>Data Science</h4>
              <p>Statistics, machine learning, and data engineering roadmaps.</p>
            </article>

            <article className="branch-card">
              <h4>Web Development</h4>
              <p>Front-end, back-end, and full-stack roadmaps with project tracks.</p>
            </article>

            <article className="branch-card">
              <h4>Product Design</h4>
              <p>UX fundamentals, prototyping, and portfolio projects.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="landing-steps" aria-label="How it works">
        <div className="steps-wrapper">
          <h2>How FutureMap Works</h2>
          <p className="steps-intro">Three simple steps to a clearer, achievable career plan.</p>

          <div className="steps-grid">
            <div className="step">
              <div className="step-index">1</div>
              <h4>Tell Us About Yourself</h4>
              <p>Share your interests, skills, and academic background to get precise matches.</p>
            </div>

            <div className="step">
              <div className="step-index">2</div>
              <h4>Explore Tailored Roadmaps</h4>
              <p>Receive multi-step learning roadmaps with milestones and recommended resources.</p>
            </div>

            <div className="step">
              <div className="step-index">3</div>
              <h4>Build & Track Skills</h4>
              <p>Follow guided projects and assessments to prove your readiness for next roles.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-testimonials" aria-label="Testimonials">
        <div className="testimonials-wrapper">
          <h2>What students say</h2>
          <div className="testimonials-grid">
            <blockquote className="testimonial">
              <p>“FutureMap helped me find a specialization that matched my interests — the roadmap made learning practical and fast.”</p>
              <cite>— Asha, Computer Science Student</cite>
            </blockquote>

            <blockquote className="testimonial">
              <p>“I landed an internship after following the suggested projects. The platform highlights skills recruiters actually want.”</p>
              <cite>— Ryan, Intern</cite>
            </blockquote>

            <blockquote className="testimonial">
              <p>“Clear milestones and curated resources saved me months of trial-and-error.”</p>
              <cite>— Leena, Graduate</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="landing-newsletter" aria-label="Newsletter">
        <div className="newsletter-inner">
          <div className="newsletter-copy">
            <h3>Get career tips & roadmap updates</h3>
            <p>Subscribe to receive curated resources and event invites.</p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault()
              if (!email) return
              // In a real app, submit to backend. For now, simple confirm.
              alert(`Thanks — we'll send updates to ${email}`)
              setEmail('')
            }}
          >
            <input
              type="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="landing-cta-footer" aria-label="Get started">
        <div className="footer-inner">
          <div className="footer-copy">
            <h3>Ready to plan your future?</h3>
            <p>{user ? 'Continue to your dashboard to view your personalized roadmap.' : 'Sign up and get your personalized roadmap in minutes.'}</p>
          </div>
          <div className="footer-action">
            {user ? (
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            ) : (
              <button className="btn btn-primary" onClick={() => navigate('/auth')}>Get Started</button>
            )}
            <button className="btn btn-outline" onClick={() => navigate('/how-it-works')}>Learn More</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing


