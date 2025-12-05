"use client";
import React from 'react';
import { SearchFilters as SearchFiltersType } from '@/types/fraud.types';
import { AGENCY_CATEGORIES, REGIONS, RESOURCE_TYPES } from '@/lib/fraud-data';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: <K extends keyof SearchFiltersType>(key: K, value: SearchFiltersType[K]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function SearchFilters({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters
}: SearchFiltersProps) {
  return (
    <div className="w-64 bg-bg-card-dark rounded-lg shadow-lg p-6 h-fit sticky top-4 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-brand-red hover:text-brand-rose transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Agency Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value as any)}
          className="w-full px-3 py-2 bg-bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all text-text-primary"
        >
          {AGENCY_CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Region Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Region
        </label>
        <select
          value={filters.region}
          onChange={(e) => onFilterChange('region', e.target.value)}
          className="w-full px-3 py-2 bg-bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all text-text-primary"
        >
          {REGIONS.map(region => (
            <option key={region.value} value={region.value}>
              {region.label}
            </option>
          ))}
        </select>
      </div>

      {/* Resource Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Resource Type
        </label>
        <select
          value={filters.resourceType}
          onChange={(e) => onFilterChange('resourceType', e.target.value as any)}
          className="w-full px-3 py-2 bg-bg-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red outline-none transition-all text-text-primary"
        >
          {RESOURCE_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}