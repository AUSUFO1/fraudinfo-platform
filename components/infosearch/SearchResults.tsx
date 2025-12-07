"use client";
import React from 'react';
import { SearchResults as SearchResultsType } from '@/types/fraud.types';
import { Shield, Wrench, Search as SearchIcon } from 'lucide-react';
import AgencyCard from '../cards/AgencyCard';
import ResourceCard from '../cards/ResourceCard';

interface SearchResultsProps {
  results: SearchResultsType;
  searchQuery: string;
}

export default function SearchResults({ results, searchQuery }: SearchResultsProps) {
  console.log('SearchResults Component:');
  console.log('  Total Results:', results.total);
  console.log('  Agencies:', results.agencies.length, results.agencies);
  console.log('  Resources:', results.resources.length, results.resources);

  if (results.total === 0 && searchQuery) {
    return (
      <div className="bg-bg-card-dark rounded-lg shadow-lg p-12 text-center border border-gray-800">
        <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No results found
        </h3>
        <p className="text-text-secondary">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Agencies Section */}
      {results.agencies.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-red" />
            Agencies ({results.agencies.length})
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.agencies.map(agency => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </section>
      )}

      {/* Resources Section */}
      {results.resources.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-brand-red" />
            Tools & Resources ({results.resources.length})
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {results.resources.map(resource => {
              console.log('🔧 Rendering resource:', resource.name);
              return (
                <ResourceCard key={resource.id} resource={resource} />
              );
            })}
          </div>
        </section>
      )}

      {/* No Results at All */}
      {results.total === 0 && !searchQuery && (
        <div className="bg-bg-card-dark rounded-lg shadow-lg p-12 text-center border border-gray-800">
          <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Start searching or apply filters
          </h3>
          <p className="text-text-secondary">
            Use the quick search terms or filters to find agencies and resources
          </p>
        </div>
      )}
    </div>
  );
}