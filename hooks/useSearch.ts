import { useState, useMemo, useCallback } from 'react';
import { SearchFilters, SearchResults } from '@/types/fraud.types';
import { agencies, fraudResources } from '@/lib/fraud-data';
import { performSearch, hasActiveFilters as checkActiveFilters } from '@/lib/search.utils';

const initialFilters: SearchFilters = {
  category: 'all',
  region: 'all',
  resourceType: 'all'
};

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  // Compute search results
  // FIXED: Now shows results if filters are active OR search query exists
  const results = useMemo<SearchResults>(() => {
    const hasQuery = searchQuery.trim().length > 0;
    const hasFilters = checkActiveFilters(filters);
    
    // Show nothing only if no query AND no active filters
    if (!hasQuery && !hasFilters) {
      return { agencies: [], resources: [], total: 0 };
    }
    
    // Otherwise perform search with current query and filters
    return performSearch(searchQuery, filters, agencies, fraudResources);
  }, [searchQuery, filters]);

  // Update individual filter
  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => checkActiveFilters(filters), [filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    results,
    hasActiveFilters
  };
}