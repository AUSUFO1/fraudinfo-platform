"use client";
import React, { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import SearchFilters from "@/components/infosearch/SearchFilters";
import SearchResults from "@/components/infosearch/SearchResults";
import QuickSearchTerms from "@/components/infosearch/QuickSearchTerms";

import { agencies, fraudResources } from "@/lib/fraud-data";
import { performSearch, hasActiveFilters } from "@/lib/search.utils";
import { SearchFilters as SearchFiltersType, SearchResults as SearchResultsType } from "@/types/fraud.types";

/* SEARCH CONTENT COMPONENT - Handles the actual search logic */
function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFiltersType>({
    category: "all",
    region: "all",
    resourceType: "all"
  });

  // Update filter handler
  const updateFilter = useCallback(<K extends keyof SearchFiltersType>(
    key: K,
    value: SearchFiltersType[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Clear filters handler
  const clearFilters = useCallback(() => {
    setFilters({
      category: "all",
      region: "all",
      resourceType: "all"
    });
  }, []);

  // Clear search query
  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  // Clear everything
  const clearAll = useCallback(() => {
    setQuery("");
    setFilters({
      category: "all",
      region: "all",
      resourceType: "all"
    });
  }, []);

  // Compute search results
  const results: SearchResultsType = useMemo(() => {
    const hasQuery = query.trim().length > 0;
    const hasFilters = hasActiveFilters(filters);
    
    // Show nothing only if no query AND no active filters
    if (!hasQuery && !hasFilters) {
      return { agencies: [], resources: [], total: 0 };
    }
    
    // Otherwise perform search with current query and filters
    return performSearch(query, filters, agencies, fraudResources);
  }, [query, filters]);

  return (
    /* MAIN CONTAINER - Responsive padding for mobile/tablet/desktop */
    <div className="min-h-screen bg-bg-dark p-4 sm:p-6 md:p-8 lg:p-12 pt-6 sm:pt-8 md:pt-12">
      
      {/* QUICK SEARCH SECTION - Responsive spacing and padding */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 pt-4 sm:pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 sm:mb-4 text-center">
          Quick Search
        </h2>
        <QuickSearchTerms onTermClick={setQuery} />
      </div>

      {/* MAIN CONTENT GRID - Responsive layout: stacked mobile, side-by-side desktop */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
        
        {/* FILTERS SIDEBAR - Full width mobile, fixed width desktop */}
        <div className="w-full md:w-64 md:shrink-0">
          <SearchFilters
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters(filters)}
          />
        </div>

        {/* SEARCH RESULTS - Flexible width on desktop */}
        <div className="flex-1 min-w-0">
          
          {/* ACTIVE FILTERS BAR - Responsive padding and text sizing */}
          {(query || hasActiveFilters(filters)) && (
            <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-bg-card-dark rounded-lg border border-gray-800">
              
              {/* RESULTS COUNT - Responsive text size and layout */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-2">
                <p className="text-text-secondary text-xs sm:text-sm">
                  Found <span className="text-brand-red font-semibold">{results.total}</span> results
                  {' '}({results.agencies.length} agencies, {results.resources.length} resources)
                </p>
                
                {/* CLEAR ALL BUTTON - Responsive sizing */}
                {(query || hasActiveFilters(filters)) && (
                  <button
                    onClick={clearAll}
                    className="text-xs sm:text-xs text-brand-red hover:text-brand-rose transition-colors flex items-center gap-1 self-start sm:self-auto"
                  >
                    <X className="w-3 h-3" />
                    Clear All
                  </button>
                )}
              </div>
              
              {/* ACTIVE FILTER TAGS - Responsive wrapping and sizing */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                
                {/* SEARCH QUERY TAG */}
                {query && (
                  <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-brand-red/20 text-brand-red text-xs rounded-full">
                    Search: "{query.length > 20 ? query.substring(0, 20) + '...' : query}"
                    <button
                      onClick={clearSearch}
                      className="hover:bg-brand-red/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {/* CATEGORY FILTER TAG */}
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-brand-rose/20 text-brand-rose text-xs rounded-full">
                    Category: {filters.category}
                    <button
                      onClick={() => updateFilter('category', 'all')}
                      className="hover:bg-brand-rose/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {/* REGION FILTER TAG */}
                {filters.region !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-brand-rose/20 text-brand-rose text-xs rounded-full">
                    Region: {filters.region}
                    <button
                      onClick={() => updateFilter('region', 'all')}
                      className="hover:bg-brand-rose/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {/* RESOURCE TYPE FILTER TAG */}
                {filters.resourceType !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-brand-rose/20 text-brand-rose text-xs rounded-full">
                    Resource: {filters.resourceType}
                    <button
                      onClick={() => updateFilter('resourceType', 'all')}
                      className="hover:bg-brand-rose/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
          
          <SearchResults results={results} searchQuery={query} />
        </div>
      </div>
    </div>
  );
}

/* MAIN PAGE COMPONENT - Wraps SearchContent in Suspense boundary */
export default function InfoSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-dark p-4 sm:p-6 md:p-8 lg:p-12 flex items-center justify-center">
        <div className="text-text-primary text-lg">Loading search...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}