"use client";

import React, { useState } from "react";
import agenciesData from "@/data/agencies.json";
import type { Agency } from "@/lib/types";
import AgencyCard from "@/components/cards/AgencyCard";
import { Search } from "lucide-react";

const AgenciesPage = () => {
  const agencies: Agency[] = agenciesData as Agency[];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agency.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agency.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 px-4 bg-bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Anti-Fraud Agencies
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Find verified agencies worldwide to report fraud, cybercrime, and scams.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search agencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-bg-card-dark border border-border-dark rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-red transition-colors"
          />
        </div>

        {/* Agencies Grid */}
        {filteredAgencies.length === 0 ? (
          <div className="text-center py-12 text-text-secondary">
            No agencies found matching your search
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AgenciesPage;
