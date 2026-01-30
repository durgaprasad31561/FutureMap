// Comprehensive career data with matching criteria
export const careers = [
  {
    id: 'cse',
    name: 'Computer Science Engineering',
    category: 'Engineering',
    description: 'Design and develop software systems, applications, and technologies',
    matchingCriteria: {
      streams: ['MPC', 'MEC'],
      subjects: ['Mathematics', 'Physics', 'Computer Science'],
      interests: ['Coding', 'Design', 'Research'],
      skills: ['Problem Solving', 'Analytical Thinking', 'Technical Skills', 'Creativity'],
      goals: ['Placements', 'Startup', 'Higher Studies']
    },
    skills: [
      'Programming Languages (Python, Java, C++)',
      'Data Structures & Algorithms',
      'Software Development',
      'Database Management',
      'Web Development',
      'Machine Learning & AI'
    ],
    courses: [
      'Introduction to Programming',
      'Data Structures and Algorithms',
      'Web Development Fundamentals',
      'Database Systems',
      'Software Engineering',
      'Machine Learning Basics'
    ],
    institutions: [
      'IIT Bombay, IIT Delhi, IIT Madras, IIT Kanpur, IIT Kharagpur',
      'NIT Trichy, NIT Warangal, NIT Surathkal, NIT Calicut',
      'BITS Pilani, BITS Goa, BITS Hyderabad',
      'IIIT Hyderabad, IIIT Bangalore, IIIT Delhi',
      'VIT Vellore, SRM University, Manipal Institute of Technology',
      'Jadavpur University, Anna University, Delhi Technological University'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MPC', duration: '2 years' },
      { step: 2, title: 'Clear JEE Main/Advanced', duration: '1 year' },
      { step: 3, title: 'BTech in CSE (4 years)', duration: '4 years' },
      { step: 4, title: 'Internships & Projects', duration: 'Ongoing' },
      { step: 5, title: 'Placements or Higher Studies', duration: 'After graduation' }
    ],
    whyMatch: 'Matches your interest in coding and technical problem-solving'
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    category: 'Engineering',
    description: 'Design, develop, and maintain mechanical systems and machinery',
    matchingCriteria: {
      streams: ['MPC'],
      subjects: ['Mathematics', 'Physics'],
      interests: ['Construction', 'Robotics', 'Design'],
      skills: ['Problem Solving', 'Analytical Thinking', 'Technical Skills'],
      goals: ['Placements', 'Higher Studies']
    },
    skills: [
      'CAD/CAM Design',
      'Thermodynamics',
      'Manufacturing Processes',
      'Project Management',
      'Material Science',
      'Automotive Engineering'
    ],
    courses: [
      'Engineering Drawing',
      'Mechanics and Dynamics',
      'Material Science',
      'Thermodynamics',
      'Manufacturing Technology',
      'Machine Design'
    ],
    institutions: [
      'IIT Madras, IIT Bombay, IIT Delhi, IIT Kanpur',
      'NIT Trichy, NIT Warangal, NIT Surathkal',
      'BITS Pilani, BITS Goa',
      'PSG College of Technology, Coimbatore',
      'VIT Vellore, SRM University, Manipal Institute of Technology',
      'Jadavpur University, Anna University'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MPC', duration: '2 years' },
      { step: 2, title: 'Clear JEE Main/Advanced', duration: '1 year' },
      { step: 3, title: 'BTech in Mechanical (4 years)', duration: '4 years' },
      { step: 4, title: 'Industrial Training', duration: 'During course' },
      { step: 5, title: 'Core Companies or Higher Studies', duration: 'After graduation' }
    ],
    whyMatch: 'Aligns with your interest in construction and analytical thinking'
  },
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering',
    category: 'Engineering',
    description: 'Design and develop electronic devices and communication systems',
    matchingCriteria: {
      streams: ['MPC'],
      subjects: ['Mathematics', 'Physics'],
      interests: ['Robotics', 'Research', 'Design'],
      skills: ['Problem Solving', 'Analytical Thinking', 'Technical Skills'],
      goals: ['Placements', 'Higher Studies']
    },
    skills: [
      'Circuit Design',
      'Digital Electronics',
      'Signal Processing',
      'Communication Systems',
      'Embedded Systems',
      'VLSI Design'
    ],
    courses: [
      'Basic Electronics',
      'Circuit Analysis',
      'Digital Signal Processing',
      'Communication Engineering',
      'Microprocessors',
      'VLSI Design'
    ],
    institutions: [
      'IIT Bombay, IIT Delhi, IIT Madras, IIT Kanpur',
      'NIT Trichy, NIT Warangal, NIT Surathkal',
      'BITS Pilani, BITS Goa',
      'IIIT Hyderabad, IIIT Bangalore, IIIT Delhi',
      'VIT Vellore, SRM University, Manipal Institute of Technology'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MPC', duration: '2 years' },
      { step: 2, title: 'Clear JEE Main/Advanced', duration: '1 year' },
      { step: 3, title: 'BTech in ECE (4 years)', duration: '4 years' },
      { step: 4, title: 'Projects & Internships', duration: 'Ongoing' },
      { step: 5, title: 'Tech Companies or Research', duration: 'After graduation' }
    ],
    whyMatch: 'Matches your interest in robotics and technical problem-solving'
  },
  {
    id: 'biotech',
    name: 'Biotechnology Engineering',
    category: 'Engineering',
    description: 'Apply biological processes to develop products and technologies',
    matchingCriteria: {
      streams: ['BiPC', 'MPC'],
      subjects: ['Biology', 'Chemistry', 'Mathematics'],
      interests: ['Research', 'Design'],
      skills: ['Analytical Thinking', 'Problem Solving', 'Research'],
      goals: ['Higher Studies', 'Research', 'Placements']
    },
    skills: [
      'Molecular Biology',
      'Genetic Engineering',
      'Biochemistry',
      'Research Methodology',
      'Laboratory Techniques',
      'Bioinformatics'
    ],
    courses: [
      'Cell Biology',
      'Genetics',
      'Biochemistry',
      'Microbiology',
      'Biostatistics',
      'Bioinformatics'
    ],
    institutions: [
      'IIT Delhi, IIT Bombay, IIT Madras, IIT Kharagpur',
      'NIT Warangal, NIT Rourkela, NIT Calicut',
      'VIT Vellore, SRM University, Manipal Institute of Technology',
      'Jawaharlal Nehru University (JNU), Delhi',
      'University of Delhi, University of Hyderabad',
      'Amity University, Lovely Professional University'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with BiPC/MPC', duration: '2 years' },
      { step: 2, title: 'Clear JEE Main/Advanced', duration: '1 year' },
      { step: 3, title: 'BTech in Biotechnology (4 years)', duration: '4 years' },
      { step: 4, title: 'Research Projects', duration: 'During course' },
      { step: 5, title: 'Higher Studies or Research Labs', duration: 'After graduation' }
    ],
    whyMatch: 'Perfect for your interest in research and biology background'
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    category: 'Engineering',
    description: 'Design and construct infrastructure projects like buildings, roads, bridges',
    matchingCriteria: {
      streams: ['MPC'],
      subjects: ['Mathematics', 'Physics'],
      interests: ['Construction', 'Design'],
      skills: ['Problem Solving', 'Analytical Thinking', 'Leadership'],
      goals: ['Placements', 'Startup']
    },
    skills: [
      'Structural Design',
      'Construction Management',
      'Surveying',
      'Project Planning',
      'CAD Software',
      'Environmental Engineering'
    ],
    courses: [
      'Engineering Drawing',
      'Structural Analysis',
      'Construction Materials',
      'Surveying',
      'Geotechnical Engineering',
      'Project Management'
    ],
    institutions: [
      'IIT Madras, IIT Bombay, IIT Delhi, IIT Kanpur',
      'NIT Trichy, NIT Warangal, NIT Surathkal',
      'BITS Pilani, BITS Goa',
      'PSG College of Technology, Coimbatore',
      'VIT Vellore, SRM University, Manipal Institute of Technology',
      'Jadavpur University, Anna University, Delhi Technological University'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MPC', duration: '2 years' },
      { step: 2, title: 'Clear JEE Main/Advanced', duration: '1 year' },
      { step: 3, title: 'BTech in Civil (4 years)', duration: '4 years' },
      { step: 4, title: 'Site Training', duration: 'During course' },
      { step: 5, title: 'Construction Companies or Own Firm', duration: 'After graduation' }
    ],
    whyMatch: 'Ideal for your interest in construction and leadership skills'
  },
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    category: 'Technology',
    description: 'Analyze and interpret complex data to help organizations make decisions',
    matchingCriteria: {
      streams: ['MPC', 'MEC'],
      subjects: ['Mathematics', 'Computer Science', 'Statistics'],
      interests: ['Coding', 'Research', 'Analytics'],
      skills: ['Analytical Thinking', 'Problem Solving', 'Technical Skills'],
      goals: ['Placements', 'Higher Studies']
    },
    skills: [
      'Python/R Programming',
      'Statistics & Probability',
      'Machine Learning',
      'Data Visualization',
      'Database Management',
      'Big Data Technologies'
    ],
    courses: [
      'Statistics Fundamentals',
      'Python for Data Science',
      'Machine Learning Basics',
      'Data Visualization',
      'Database Systems',
      'Big Data Analytics'
    ],
    institutions: [
      'IIT Bombay, IIT Delhi, IIT Madras, IIT Kanpur',
      'NIT Trichy, NIT Warangal, NIT Surathkal',
      'IIIT Hyderabad, IIIT Bangalore, IIIT Delhi',
      'BITS Pilani, BITS Goa',
      'VIT Vellore, SRM University, Manipal Institute of Technology',
      'Indian Statistical Institute (ISI), Kolkata'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MPC/MEC', duration: '2 years' },
      { step: 2, title: 'BTech/BSc in relevant field', duration: '4 years' },
      { step: 3, title: 'Data Science Specialization', duration: 'During/After graduation' },
      { step: 4, title: 'Internships & Projects', duration: 'Ongoing' },
      { step: 5, title: 'Data Analyst/Scientist Roles', duration: 'After graduation' }
    ],
    whyMatch: 'Matches your analytical thinking and interest in coding'
  },
  {
    id: 'ece-ai',
    name: 'Electronics & AI Engineering',
    category: 'Engineering',
    description: 'Combine electronics with artificial intelligence for smart systems and IoT',
    matchingCriteria: {
      streams: ['MPC'],
      subjects: ['Mathematics', 'Physics', 'Computer Science'],
      interests: ['Coding', 'Robotics', 'Research'],
      skills: ['Problem Solving', 'Analytical Thinking', 'Technical Skills', 'Creativity'],
      goals: ['Placements', 'Higher Studies', 'Startup']
    },
    skills: [
      'Embedded Systems',
      'Machine Learning',
      'IoT Development',
      'Signal Processing',
      'Python & C++',
      'AI/ML Algorithms'
    ],
    courses: [
      'Embedded Systems Design',
      'Machine Learning Fundamentals',
      'IoT and Sensor Networks',
      'Digital Signal Processing',
      'Neural Networks',
      'Robotics'
    ],
    institutions: [
      'IIT Bombay, IIT Delhi, IIT Madras, IIT Kanpur',
      'NIT Trichy, NIT Warangal',
      'IIIT Hyderabad, IIIT Bangalore, IIIT Delhi',
      'BITS Pilani, BITS Goa',
      'VIT Vellore, SRM University'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MPC', duration: '2 years' },
      { step: 2, title: 'Clear JEE Main/Advanced', duration: '1 year' },
      { step: 3, title: 'BTech in ECE/AI (4 years)', duration: '4 years' },
      { step: 4, title: 'AI/ML Projects & Internships', duration: 'Ongoing' },
      { step: 5, title: 'Tech Companies or Research', duration: 'After graduation' }
    ],
    whyMatch: 'Perfect blend of electronics and AI for your coding and robotics interests'
  },
  {
    id: 'commerce-tech',
    name: 'Commerce with Technology',
    category: 'Commerce & Technology',
    description: 'Combine commerce knowledge with technology for business analytics and fintech',
    matchingCriteria: {
      streams: ['MEC'],
      subjects: ['Mathematics', 'Economics', 'Commerce', 'Computer Science'],
      interests: ['Coding', 'Research', 'Design'],
      skills: ['Analytical Thinking', 'Problem Solving', 'Communication', 'Technical Skills'],
      goals: ['Placements', 'Startup', 'Higher Studies']
    },
    skills: [
      'Business Analytics',
      'Financial Technology',
      'Data Analysis',
      'Accounting Software',
      'E-commerce Platforms',
      'Digital Marketing'
    ],
    courses: [
      'Business Analytics',
      'Financial Technology (FinTech)',
      'Data Science for Business',
      'E-commerce Management',
      'Digital Marketing',
      'Accounting Information Systems'
    ],
    institutions: [
      'Delhi University, Mumbai University, Calcutta University',
      'Symbiosis International University, Pune',
      'Christ University, Bangalore',
      'Narsee Monjee College, Mumbai',
      'Loyola College, Chennai',
      'St. Xavier\'s College, Mumbai'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MEC', duration: '2 years' },
      { step: 2, title: 'BCom/BBA with Tech focus', duration: '3-4 years' },
      { step: 3, title: 'Specialization in FinTech/Analytics', duration: 'During/After graduation' },
      { step: 4, title: 'Internships in Tech Companies', duration: 'Ongoing' },
      { step: 5, title: 'Business Analyst/FinTech Roles', duration: 'After graduation' }
    ],
    whyMatch: 'Ideal for MEC stream students interested in technology and business'
  },
  {
    id: 'aerospace',
    name: 'Aerospace Engineering',
    category: 'Engineering',
    description: 'Design and develop aircraft, spacecraft, and related systems',
    matchingCriteria: {
      streams: ['MPC'],
      subjects: ['Mathematics', 'Physics'],
      interests: ['Research', 'Design', 'Robotics'],
      skills: ['Problem Solving', 'Analytical Thinking', 'Technical Skills'],
      goals: ['Higher Studies', 'Placements', 'Research']
    },
    skills: [
      'Aerodynamics',
      'Propulsion Systems',
      'Aircraft Design',
      'Space Technology',
      'CAD/CAM',
      'Materials Science'
    ],
    courses: [
      'Aerodynamics',
      'Aircraft Structures',
      'Propulsion Systems',
      'Flight Mechanics',
      'Space Technology',
      'Avionics'
    ],
    institutions: [
      'IIT Bombay, IIT Madras, IIT Kanpur, IIT Kharagpur',
      'IIST (Indian Institute of Space Science and Technology)',
      'NIT Trichy, NIT Warangal',
      'BITS Pilani',
      'Hindustan Institute of Technology, Chennai'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MPC', duration: '2 years' },
      { step: 2, title: 'Clear JEE Main/Advanced', duration: '1 year' },
      { step: 3, title: 'BTech in Aerospace (4 years)', duration: '4 years' },
      { step: 4, title: 'Research Projects', duration: 'During course' },
      { step: 5, title: 'ISRO/DRDO or Higher Studies', duration: 'After graduation' }
    ],
    whyMatch: 'Perfect for your interest in research and technical problem-solving'
  },
  {
    id: 'chemical',
    name: 'Chemical Engineering',
    category: 'Engineering',
    description: 'Design processes for converting raw materials into useful products',
    matchingCriteria: {
      streams: ['MPC', 'BiPC'],
      subjects: ['Mathematics', 'Physics', 'Chemistry'],
      interests: ['Research', 'Design'],
      skills: ['Analytical Thinking', 'Problem Solving', 'Technical Skills'],
      goals: ['Placements', 'Higher Studies', 'Research']
    },
    skills: [
      'Process Design',
      'Chemical Process Technology',
      'Plant Operations',
      'Safety Engineering',
      'Materials Science',
      'Environmental Engineering'
    ],
    courses: [
      'Chemical Process Principles',
      'Thermodynamics',
      'Mass Transfer',
      'Chemical Reaction Engineering',
      'Process Control',
      'Plant Design'
    ],
    institutions: [
      'IIT Bombay, IIT Delhi, IIT Madras, IIT Kanpur',
      'NIT Trichy, NIT Warangal, NIT Rourkela',
      'BITS Pilani, BITS Goa',
      'ICT Mumbai (Institute of Chemical Technology)',
      'Jadavpur University, Anna University'
    ],
    careerPath: [
      { step: 1, title: 'Complete 12th with MPC/BiPC', duration: '2 years' },
      { step: 2, title: 'Clear JEE Main/Advanced', duration: '1 year' },
      { step: 3, title: 'BTech in Chemical (4 years)', duration: '4 years' },
      { step: 4, title: 'Industrial Training', duration: 'During course' },
      { step: 5, title: 'Chemical Industries or Research', duration: 'After graduation' }
    ],
    whyMatch: 'Matches your chemistry background and analytical skills'
  }
]

// Recommendation engine function
export const getRecommendations = (userProfile) => {
  const { stream, favoriteSubjects, interests, skills, goal } = userProfile
  
  if (!stream || !goal) {
    return []
  }
  
  // Calculate match score for each career
  const scoredCareers = careers.map(career => {
    let score = 0
    let matchReasons = []
    
    // Stream match (30 points) - Must match stream
    if (career.matchingCriteria.streams.includes(stream)) {
      score += 30
      matchReasons.push(`Perfect match for your ${stream} stream`)
    } else {
      // If stream doesn't match, significantly reduce score
      return {
        ...career,
        matchScore: 0,
        matchReasons: []
      }
    }
    
    // Subject matches (25 points) - More weight for subject alignment
    const subjectMatches = favoriteSubjects.filter(subject => 
      career.matchingCriteria.subjects.includes(subject)
    )
    if (subjectMatches.length > 0) {
      const subjectScore = Math.min((subjectMatches.length / Math.max(favoriteSubjects.length, 1)) * 25, 25)
      score += subjectScore
      matchReasons.push(`Your favorite subjects align: ${subjectMatches.join(', ')}`)
    }
    
    // Interest matches (25 points) - High weight for interests
    const interestMatches = interests.filter(interest => 
      career.matchingCriteria.interests.includes(interest)
    )
    if (interestMatches.length > 0) {
      const interestScore = Math.min((interestMatches.length / Math.max(interests.length, 1)) * 25, 25)
      score += interestScore
      matchReasons.push(`Your interests match: ${interestMatches.join(', ')}`)
    }
    
    // Skill matches (15 points)
    const skillMatches = skills.filter(skill => 
      career.matchingCriteria.skills.includes(skill)
    )
    if (skillMatches.length > 0) {
      const skillScore = Math.min((skillMatches.length / Math.max(skills.length, 1)) * 15, 15)
      score += skillScore
      matchReasons.push(`Your skills are relevant: ${skillMatches.join(', ')}`)
    }
    
    // Goal match (10 points) - Important for career alignment
    if (career.matchingCriteria.goals.includes(goal)) {
      score += 10
      matchReasons.push(`Aligns perfectly with your career goal: ${goal}`)
    }
    
    // Bonus points for multiple matches in same category
    if (subjectMatches.length >= 2) score += 5
    if (interestMatches.length >= 2) score += 5
    if (skillMatches.length >= 2) score += 3
    
    return {
      ...career,
      matchScore: Math.min(Math.round(score), 100),
      matchReasons
    }
  })
  
  // Filter out careers with 0 score and sort by match score
  const validCareers = scoredCareers
    .filter(career => career.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
  
  // Return top 3, or all if less than 3
  return validCareers.slice(0, 3)
}

