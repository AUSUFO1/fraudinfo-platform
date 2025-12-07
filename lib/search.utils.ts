// ===================================
// FILE: src/lib/search.utils.ts
// FIXED: Import from correct location
// ===================================

import { Agency, FraudResource, SearchFilters, SearchResults } from '@/types/fraud.types';

/**
 * Performs search across agencies and resources
 */
export function performSearch(
  query: string,
  filters: SearchFilters,
  agencies: Agency[],
  resources: FraudResource[]
): SearchResults {
  const normalizedQuery = query.toLowerCase().trim();

  const matchedAgencies = searchAgencies(normalizedQuery, filters, agencies);
  const matchedResources = searchResources(normalizedQuery, filters, resources);

  return {
    agencies: matchedAgencies,
    resources: matchedResources,
    total: matchedAgencies.length + matchedResources.length
  };
}

/**
 * Search agencies with filters
 */
function searchAgencies(
  query: string,
  filters: SearchFilters,
  agencies: Agency[]
): Agency[] {
  return agencies.filter(agency => {
    // Filter matches (always applied first)
    const matchesCategory = filters.category === 'all' || agency.category === filters.category;
    const matchesRegion = filters.region === 'all' || agency.region === filters.region;
    
    // If filters don't match, exclude immediately
    if (!matchesCategory || !matchesRegion) {
      return false;
    }

    // Search match (only if query exists)
    if (query) {
      const matchesSearch = 
        agency.name.toLowerCase().includes(query) ||
        agency.shortName.toLowerCase().includes(query) ||
        agency.description.toLowerCase().includes(query) ||
        agency.specialties.some(s => s.toLowerCase().includes(query)) ||
        agency.country.toLowerCase().includes(query) ||
        agency.region.toLowerCase().includes(query) ||
        agency.category.toLowerCase().includes(query);
      
      return matchesSearch;
    }

    // No query, so filter match is enough
    return true;
  });
}

/**
 * Search resources with filters
 */
function searchResources(
  query: string,
  filters: SearchFilters,
  resources: FraudResource[]
): FraudResource[] {
  return resources.filter(resource => {
    // Filter match (always applied first)
    const matchesResourceType = filters.resourceType === 'all' || resource.category === filters.resourceType;
    
    // If filter doesn't match, exclude immediately
    if (!matchesResourceType) {
      return false;
    }

    // Search match (only if query exists)
    if (query) {
      const matchesSearch =
        resource.name.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(t => t.toLowerCase().includes(query)) ||
        resource.category.toLowerCase().includes(query);
      
      return matchesSearch;
    }

    // No query, so filter match is enough
    return true;
  });
}

/**
 * Check if filters are active (not on default 'all')
 */
export function hasActiveFilters(filters: SearchFilters): boolean {
  return (
    filters.category !== 'all' ||
    filters.region !== 'all' ||
    filters.resourceType !== 'all'
  );
}