import React from 'react';
import { QUICK_SEARCH_TERMS } from '@/lib/fraud-data';

interface QuickSearchTermsProps {
  onTermClick: (term: string) => void;
}

export default function QuickSearchTerms({ onTermClick }: QuickSearchTermsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {QUICK_SEARCH_TERMS.map(term => (
        <button
          key={term}
          onClick={() => onTermClick(term)}
          className="px-4 py-2 bg-brand-red/20 hover:bg-brand-red hover:text-white text-text-primary rounded-full text-sm transition-all duration-300 backdrop-blur-sm border border-brand-red/30 hover:border-brand-red"
        >
          {term}
        </button>
      ))}
    </div>
  );
}