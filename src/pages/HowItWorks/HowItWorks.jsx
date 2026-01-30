import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HowItWorks.css'

export default function HowItWorks({ user }) {
  const navigate = useNavigate()
  const steps = [
    {
      number: 1,
      title: 'Complete Your Profile',
      description: 'Tell us about your interests, skills, academic background, and career aspirations. The more details you share, the better our recommendations.',
      icon: '📋',
    },
    {
      number: 2,
      title: 'Get Personalized Matches',
      description: 'Our AI analyzes your profile and matches you with career paths that align with your strengths, interests, and goals.',
      icon: '🎯',
    },
    {
      number: 3,
      title: 'Explore Roadmaps',
      description: 'Access detailed, step-by-step learning roadmaps for your matched careers. See all required skills, milestones, and recommended resources.',
      icon: '🗺️',
    },
    {
      number: 4,
      title: 'Build Your Skills',
      description: 'Follow guided learning modules, work on real-world projects, and track your progress as you develop job-ready skills.',
      icon: '⚙️',
    },
    {
      number: 5,
      title: 'Track & Share',
      description: 'Monitor your achievements, build a portfolio, and share your progress with mentors, employers, or academic advisors.',
      icon: '📊',
    },
  ]

  const benefits = [
    {
      title: 'Personalized Guidance',
      description: 'No one-size-fits-all advice. Get recommendations tailored to your unique profile.',
      icon: '✨',
    },
    {
      title: 'Clear Roadmaps',
      description: 'Know exactly what skills to learn and in what order. No guessing or wasted time.',
      icon: '🎯',
    },
    {
      title: 'Curated Resources',
      description: 'We handpick courses, books, projects, and communities for each career path.',
      icon: '📚',
    },
    {
      title: 'Community Support',
      description: 'Connect with peers, mentors, and professionals in your target fields.',
      icon: '🤝',
    },
  ]

  return (
    <main className="how-it-works">
      {/* Hero Section */}
      <section className="hw-hero">
        <div className="hw-hero-content">
          <h1>How FutureMap Works</h1>
          <p>A clear, step-by-step process to discover your ideal career and build a winning roadmap.</p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="hw-steps">
        <div className="hw-container">
          <div className="hw-section-header">
            <h2>5 Simple Steps to Success</h2>
            <p>Follow our proven process to unlock your career potential</p>
          </div>

          <div className="hw-steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="hw-step-card">
                <div className="hw-step-icon">{step.icon}</div>
                <div className="hw-step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="hw-timeline">
        <div className="hw-container">
          <div className="hw-section-header">
            <h2>The FutureMap Process</h2>
            <p>From discovery to action in weeks, not months</p>
          </div>

          <div className="hw-timeline-content">
            <div className="hw-timeline-item">
              <div className="hw-timeline-dot" />
              <div className="hw-timeline-text">
                <h4>Week 1: Profile & Assessment</h4>
                <p>Complete a comprehensive profile covering interests, skills, values, and goals. Our system analyzes your inputs.</p>
              </div>
            </div>

            <div className="hw-timeline-item">
              <div className="hw-timeline-dot" />
              <div className="hw-timeline-text">
                <h4>Week 2-3: Career Matches & Roadmap Selection</h4>
                <p>Review your top 5 matched careers. Dive into detailed roadmaps, required skills, and estimated time to reach each role.</p>
              </div>
            </div>

            <div className="hw-timeline-item">
              <div className="hw-timeline-dot" />
              <div className="hw-timeline-text">
                <h4>Week 4+: Learning & Growth</h4>
                <p>Start your first learning module. Work on projects, track milestones, and build a portfolio as you progress.</p>
              </div>
            </div>

            <div className="hw-timeline-item">
              <div className="hw-timeline-dot" />
              <div className="hw-timeline-text">
                <h4>Ongoing: Track, Share & Achieve</h4>
                <p>Monitor your progress, celebrate wins, and share achievements with your network. Stay motivated with our community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="hw-benefits">
        <div className="hw-container">
          <div className="hw-section-header">
            <h2>Why FutureMap?</h2>
            <p>Benefits that set us apart from traditional career planning</p>
          </div>

          <div className="hw-benefits-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="hw-benefit-card">
                <div className="hw-benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="hw-faq">
        <div className="hw-container">
          <div className="hw-section-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="hw-faq-grid">
            <div className="hw-faq-item">
              <h4>How long does it take to complete a roadmap?</h4>
              <p>It depends on the career path and your pace. Most roadmaps take 6-18 months of consistent effort. You can customize the timeline.</p>
            </div>

            <div className="hw-faq-item">
              <h4>Can I switch careers once I start?</h4>
              <p>Absolutely! You can explore multiple roadmaps, switch paths anytime, and pivot based on your evolving interests.</p>
            </div>

            <div className="hw-faq-item">
              <h4>Are the resources free or paid?</h4>
              <p>We recommend a mix of free and paid resources. We help you find affordable, high-quality options in every roadmap.</p>
            </div>

            <div className="hw-faq-item">
              <h4>How is FutureMap different from generic career sites?</h4>
              <p>We're personalized, step-by-step, and outcome-focused. No generic lists—just the exact path and skills you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hw-cta">
        <div className="hw-container">
          <div className="hw-cta-content">
            <h2>Ready to map your career?</h2>
            <p>Join thousands of students and professionals discovering their ideal paths.</p>
            {user ? (
              <button className="hw-cta-btn" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            ) : (
              <button className="hw-cta-btn" onClick={() => navigate('/auth')}>Get Started Today</button>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
