"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/infosearch?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mt-4 sm:mt-6 w-full max-w-2xl mx-auto relative px-4 sm:px-0"
    >
      <Search className="absolute left-6 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      
      <input
        type="text"
        placeholder="Search agencies, fraud types, or tips..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full 
                   pl-10 sm:pl-12 
                   pr-28 sm:pr-24 
                   py-2.5 sm:py-3 
                   rounded-full 
                   bg-white/90 
                   text-sm sm:text-base 
                   text-gray-900 
                   placeholder-gray-500 
                   focus:outline-none 
                   focus:border-brand-red 
                   border-2 border-white/20 
                   shadow-md 
                   transition-all duration-300"
      />
      
      <button
        type="submit"
        className="absolute 
                   right-5 sm:right-1 
                   top-1/2 -translate-y-1/2 
                   px-2 sm:px-4 
                   py-1.5 sm:py-2 
                   bg-brand-red 
                   hover:bg-brand-rose 
                   text-white 
                   rounded-full 
                   font-semibold 
                   shadow-md 
                   text-xs sm:text-xs md:text-base 
                   transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
}