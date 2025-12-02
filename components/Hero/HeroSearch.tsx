"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface HeroSearchProps {
  onSearch?: (query: string) => void;
}

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-2xl mx-auto relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search agencies, fraud types, or tips..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-brand-red border-2 border-white/20 shadow-md transition-all duration-300"
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-red hover:bg-brand-rose text-white rounded-full font-semibold shadow-md text-sm md:text-base transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
}
