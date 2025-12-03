"use client";

import React from "react";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  regionFilter: string;
  setRegionFilter: (val: string) => void;
  categories: string[];
  regions: string[];
}

const AgencyFilters = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  regionFilter,
  setRegionFilter,
  categories,
  regions,
}: FiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 justify-center md:justify-start">
      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search agencies..."
        className="px-4 py-2 bg-bg-card-dark border border-border-dark rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-brand-rose transition-colors w-full md:max-w-xs"
      />

      {/* Category */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="px-4 py-2 bg-bg-card-dark border border-border-dark rounded-xl text-text-primary focus:outline-none focus:border-brand-rose transition-colors"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* Region */}
      <select
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        className="px-4 py-2 bg-bg-card-dark border border-border-dark rounded-xl text-text-primary focus:outline-none focus:border-brand-rose transition-colors"
      >
        <option value="all">All Regions</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AgencyFilters;
