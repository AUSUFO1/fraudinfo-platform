"use client";
// Empty state when no search has been performed

import React from 'react';
import { Search, Shield, Wrench } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="bg-bg-card-dark rounded-lg shadow-lg p-12 border border-gray-800">
        <Search className="w-20 h-20 text-brand-red mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Start Your Search
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Search for fraud agencies, resources, and tools to protect yourself from scams
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-bg-dark rounded-lg p-6 border border-gray-800">
            <Shield className="w-8 h-8 text-brand-red mb-3" />
            <h3 className="font-semibold text-text-primary mb-2">
              Find Agencies
            </h3>
            <p className="text-sm text-text-secondary">
              Discover verified fraud reporting agencies worldwide
            </p>
          </div>

          <div className="bg-bg-dark rounded-lg p-6 border border-gray-800">
            <Wrench className="w-8 h-8 text-brand-red mb-3" />
            <h3 className="font-semibold text-text-primary mb-2">
              Get Tools
            </h3>
            <p className="text-sm text-text-secondary">
              Access free tools to check for data breaches and scams
            </p>
          </div>

          <div className="bg-bg-dark rounded-lg p-6 border border-gray-800">
            <Search className="w-8 h-8 text-brand-red mb-3" />
            <h3 className="font-semibold text-text-primary mb-2">
              Stay Informed
            </h3>
            <p className="text-sm text-text-secondary">
              Read expert blogs and security news updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}