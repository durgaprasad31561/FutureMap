// Small frontend-only cutoff dataset used for Rank Predictor demo
// Each entry represents an approximate closing rank for a college+branch in a state
const CUTOFFS = [
  { collegeId: 'iit-delhi', branch: 'Computer Science & Engineering', state: 'All', closingRank: 50 },
  { collegeId: 'iit-bombay', branch: 'Computer Science & Engineering', state: 'All', closingRank: 60 },
  { collegeId: 'iit-madras', branch: 'Computer Science & Engineering', state: 'All', closingRank: 70 },
  { collegeId: 'nit-trichy', branch: 'Computer Science & Engineering', state: 'Tamil Nadu', closingRank: 1200 },
  { collegeId: 'nit-trichy', branch: 'Electrical Engineering', state: 'Tamil Nadu', closingRank: 3500 },
  { collegeId: 'kl-university', branch: 'Computer Science & Engineering', state: 'Andhra Pradesh', closingRank: 8500 },
  { collegeId: 'kl-university', branch: 'Electronics & Communication', state: 'Andhra Pradesh', closingRank: 12000 },
  { collegeId: 'kits-college', branch: 'Computer Science & Engineering', state: 'Andhra Pradesh', closingRank: 22000 },
  { collegeId: 'kits-college', branch: 'Mechanical Engineering', state: 'Andhra Pradesh', closingRank: 30000 },
  { collegeId: 'nit-trichy', branch: 'Mechanical Engineering', state: 'Tamil Nadu', closingRank: 8000 },
  // Generic fallbacks
  { collegeId: 'generic-1', branch: 'Computer Science & Engineering', state: 'All', closingRank: 20000 },
]

export default CUTOFFS
