// API Service for Colleges
// This service handles all college-related API calls
// Currently uses static JSON, can be replaced with real API endpoints

import collegesData from '../pages/Resources/data/colleges.json';

// Simulate API delay for realistic behavior
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all colleges
 * @returns {Promise<Array>} Array of college objects
 */
export const fetchAllColleges = async () => {
  try {
    await delay(300); // Simulate network delay
    return collegesData.colleges;
  } catch (error) {
    console.error('Error fetching colleges:', error);
    throw new Error('Failed to fetch colleges');
  }
};

/**
 * Fetch colleges by state
 * @param {string} state - State name
 * @returns {Promise<Array>} Array of colleges in that state
 */
export const fetchCollegesByState = async (state) => {
  try {
    await delay(200);
    if (!state) return collegesData.colleges;
    return collegesData.colleges.filter(college => college.state === state);
  } catch (error) {
    console.error('Error fetching colleges by state:', error);
    throw new Error(`Failed to fetch colleges for ${state}`);
  }
};

/**
 * Search colleges by name or city
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching colleges
 */
export const searchColleges = async (query) => {
  try {
    await delay(200);
    if (!query) return collegesData.colleges;
    
    const lowerQuery = query.toLowerCase();
    return collegesData.colleges.filter(college =>
      college.name.toLowerCase().includes(lowerQuery) ||
      college.city.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Error searching colleges:', error);
    throw new Error('Search failed');
  }
};

/**
 * Get college by ID
 * @param {string} collegeId - College ID
 * @returns {Promise<Object>} College object
 */
export const getCollegeById = async (collegeId) => {
  try {
    await delay(150);
    const college = collegesData.colleges.find(c => c.id === collegeId);
    if (!college) throw new Error('College not found');
    return college;
  } catch (error) {
    console.error('Error fetching college:', error);
    throw new Error('Failed to fetch college details');
  }
};

/**
 * Get all states
 * @returns {Promise<Array>} Array of state names
 */
export const fetchAllStates = async () => {
  try {
    await delay(100);
    return collegesData.states;
  } catch (error) {
    console.error('Error fetching states:', error);
    throw new Error('Failed to fetch states');
  }
};

/**
 * Filter colleges with multiple criteria
 * @param {Object} filters - Filter criteria { state, minRank, maxFees, placement }
 * @returns {Promise<Array>} Filtered colleges
 */
export const filterColleges = async (filters) => {
  try {
    await delay(250);
    let result = collegesData.colleges;

    if (filters.state && filters.state !== 'All') {
      result = result.filter(c => c.state === filters.state);
    }

    if (filters.minRank) {
      result = result.filter(c => c.nirf_rank <= filters.minRank);
    }

    if (filters.maxFees) {
      result = result.filter(c => c.fees.total_annual <= filters.maxFees);
    }

    if (filters.minPlacement) {
      result = result.filter(c => {
        const placement = c.placements_data['2023']?.placement_percent || 0;
        return placement >= filters.minPlacement;
      });
    }

    return result;
  } catch (error) {
    console.error('Error filtering colleges:', error);
    throw new Error('Failed to filter colleges');
  }
};

/**
 * Sort colleges
 * @param {Array} colleges - Colleges to sort
 * @param {string} sortBy - Sort criteria: 'rank', 'package', 'fees'
 * @returns {Promise<Array>} Sorted colleges
 */
export const sortColleges = async (colleges, sortBy) => {
  try {
    await delay(100);
    let sorted = [...colleges];

    switch (sortBy) {
      case 'rank':
        sorted.sort((a, b) => a.nirf_rank - b.nirf_rank);
        break;
      case 'package':
        sorted.sort((a, b) => {
          const aPkg = parseInt(a.streams[0]?.avg_package || '0');
          const bPkg = parseInt(b.streams[0]?.avg_package || '0');
          return bPkg - aPkg;
        });
        break;
      case 'fees':
        sorted.sort((a, b) => a.fees.total_annual - b.fees.total_annual);
        break;
      default:
        break;
    }

    return sorted;
  } catch (error) {
    console.error('Error sorting colleges:', error);
    throw new Error('Failed to sort colleges');
  }
};

/**
 * Get statistics for colleges
 * @param {Array} colleges - Colleges to analyze
 * @returns {Promise<Object>} Statistics
 */
export const getCollegeStatistics = async (colleges) => {
  try {
    await delay(150);
    
    if (!colleges || colleges.length === 0) {
      return {
        totalColleges: 0,
        avgPackage: 0,
        avgRank: 0,
        avgFees: 0
      };
    }

    const avgPackage = colleges.reduce((sum, c) => {
      const pkg = parseInt(c.streams[0]?.avg_package || '0');
      return sum + pkg;
    }, 0) / colleges.length;

    const avgRank = colleges.reduce((sum, c) => sum + c.nirf_rank, 0) / colleges.length;

    const avgFees = colleges.reduce((sum, c) => sum + c.fees.total_annual, 0) / colleges.length;

    return {
      totalColleges: colleges.length,
      avgPackage: avgPackage.toFixed(1),
      avgRank: avgRank.toFixed(1),
      avgFees: avgFees.toFixed(0)
    };
  } catch (error) {
    console.error('Error calculating statistics:', error);
    throw new Error('Failed to calculate statistics');
  }
};

export default {
  fetchAllColleges,
  fetchCollegesByState,
  searchColleges,
  getCollegeById,
  fetchAllStates,
  filterColleges,
  sortColleges,
  getCollegeStatistics
};
