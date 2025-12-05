"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import SearchFilters from "@/components/infosearch/SearchFilters";
import SearchResults from "@/components/infosearch/SearchResults";
import QuickSearchTerms from "@/components/infosearch/QuickSearchTerms";

import { agencies, fraudResources } from "@/lib/fraud-data";
import { performSearch, hasActiveFilters } from "@/lib/search.utils";
import { SearchFilters as SearchFiltersType, SearchResults as SearchResultsType } from "@/types/fraud.types";

export default function InfoSearchPage() {
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
    <div className="min-h-screen bg-bg-dark p-6 md:p-12">
      {/* Quick Search Terms */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4 text-center">
          Quick Search
        </h2>
        <QuickSearchTerms onTermClick={setQuery} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="md:w-64">
          <SearchFilters
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters(filters)}
          />
        </div>

        {/* Search Results */}
        <div className="flex-1">
          {(query || hasActiveFilters(filters)) && (
            <div className="mb-4 p-4 bg-bg-card-dark rounded-lg border border-gray-800">
              <p className="text-text-secondary text-sm">
                Found <span className="text-brand-red font-semibold">{results.total}</span> results
                {' '}({results.agencies.length} agencies, {results.resources.length} resources)
              </p>
              {query && (
                <p className="text-text-secondary text-xs mt-1">
                  Searching for: <span className="text-text-primary font-medium">"{query}"</span>
                </p>
              )}
            </div>
          )}
          <SearchResults results={results} searchQuery={query} />
        </div>
      </div>
    </div>
  );
}