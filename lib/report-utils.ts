// Agency recommendation logic for fraud reporting
import { Agency } from '@/types/fraud.types';
import { agencies } from './fraud-data';
import { FRAUD_TYPES, getFraudTypeById } from './fraud-types';

export interface RecommendationFilters {
  fraudType?: string;
  region?: string;
  country?: string;
}

export interface AgencyRecommendation {
  agency: Agency;
  matchScore: number;
  matchReasons: string[];
}

/*
 Recommends agencies based on fraud type and location
 Returns agencies sorted by relevance with match reasons
 */
export function recommendAgencies(
  filters: RecommendationFilters
): AgencyRecommendation[] {
  const { fraudType, region, country } = filters;

  // Get fraud type details
  const fraudTypeData = fraudType ? getFraudTypeById(fraudType) : null;

  // Filter and score agencies
  const recommendations = agencies
    .map(agency => {
      let score = 0;
      const reasons: string[] = [];

      // Category match (highest priority)
      if (fraudTypeData) {
        if (fraudTypeData.recommendedCategories.includes(agency.category)) {
          score += 50;
          reasons.push(`Handles ${fraudTypeData.name.toLowerCase()}`);
        }
      }

      // Region match
      if (region && agency.region === region) {
        score += 30;
        reasons.push(`Operates in ${region}`);
      }

      // Country match (highest location priority)
      if (country && agency.country === country) {
        score += 40;
        reasons.push(`Based in ${country}`);
      }

      // Emergency availability bonus
      if (agency.emergencyAvailable) {
        score += 10;
        reasons.push('24/7 emergency support');
      }

      // Verified agency bonus
      if (agency.verified) {
        score += 5;
      }

      // Specialty match bonus
      if (fraudTypeData) {
        const hasRelevantSpecialty = agency.specialties.some(specialty =>
          fraudTypeData.name.toLowerCase().includes(specialty.toLowerCase().split(' ')[0]) ||
          specialty.toLowerCase().includes(fraudTypeData.name.toLowerCase().split(' ')[0])
        );
        if (hasRelevantSpecialty) {
          score += 15;
          reasons.push('Specializes in this fraud type');
        }
      }

      return {
        agency,
        matchScore: score,
        matchReasons: reasons
      };
    })
    .filter(rec => rec.matchScore > 0) // Only agencies with some match
    .sort((a, b) => b.matchScore - a.matchScore); // Sort by best match

  return recommendations;
}

/*
 Get top N recommended agencies
 */
export function getTopRecommendations(
  filters: RecommendationFilters,
  limit: number = 3
): AgencyRecommendation[] {
  const recommendations = recommendAgencies(filters);
  return recommendations.slice(0, limit);
}

/*
 Get all agencies for a specific region
 */
export function getAgenciesByRegion(region: string): Agency[] {
  return agencies.filter(agency => agency.region === region);
}

/*
 Get all agencies for a specific country
 */
export function getAgenciesByCountry(country: string): Agency[] {
  return agencies.filter(agency => agency.country === country);
}

/*
  Get urgency level for a fraud type
 */
export function getFraudUrgency(fraudTypeId: string): string {
  const fraudType = getFraudTypeById(fraudTypeId);
  if (!fraudType) return 'medium';
  
  const urgencyMessages = {
    critical: 'Report immediately - Time is critical for recovery',
    high: 'Report as soon as possible',
    medium: 'Report within 24-48 hours',
    low: 'Report when you have all documentation ready'
  };
  
  return urgencyMessages[fraudType.urgency];
}