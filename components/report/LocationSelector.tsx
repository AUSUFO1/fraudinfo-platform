"use client";

import React, { useEffect } from "react";
import { MapPin, Globe } from "lucide-react";
import { REGIONS } from "@/lib/fraud-data";

interface LocationSelectorProps {
  selectedRegion?: string;
  selectedCountry?: string;
  onRegionSelect: (region: string) => void;
  onCountrySelect: (country: string) => void;
}

// Common countries by region
const COUNTRIES_BY_REGION: Record<string, string[]> = {
  "West Africa": ["Nigeria", "Ghana", "Senegal", "Ivory Coast", "Benin", "Togo"],
  "North America": ["United States", "Canada", "Mexico"],
  Europe: ["United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands"],
  "East Asia": ["China", "Japan", "South Korea", "Taiwan"],
  "Southeast Asia": ["Singapore", "Malaysia", "Thailand", "Philippines", "Indonesia", "Vietnam"],
  "South Asia": ["India", "Pakistan", "Bangladesh", "Sri Lanka"],
  Oceania: ["Australia", "New Zealand", "Fiji"],
  "Middle East": ["UAE", "Saudi Arabia", "Qatar", "Israel", "Turkey"],
};

export default function LocationSelector({
  selectedRegion,
  selectedCountry,
  onRegionSelect,
  onCountrySelect,
}: LocationSelectorProps) {

  const availableCountries =
    selectedRegion && selectedRegion !== "all"
      ? COUNTRIES_BY_REGION[selectedRegion] || []
      : [];

  // Scroll to top when a selection changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedRegion, selectedCountry]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-3">
          Where Are You Located?
        </h2>
        <p className="text-text-secondary text-sm sm:text-base">
          This helps us recommend the right agencies for you
        </p>
      </div>

      <div className="space-y-6">

        {/* Region Selection */}
        <div className="bg-bg-card-dark rounded-xl p-4 sm:p-6 border border-border-dark">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-brand-red" />
            <h3 className="font-semibold text-text-primary text-sm sm:text-base">
              Select Your Region
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {REGIONS.filter((r) => r.value !== "all").map((region) => {
              const isSelected = selectedRegion === region.value;
              return (
                <button
                  key={region.value}
                  onClick={() => onRegionSelect(region.value)}
                  className={`
                    p-3 sm:p-4 rounded-lg border-2 text-left transition-all duration-200
                    ${isSelected
                      ? "bg-bg-dark border-brand-red"
                      : "bg-bg-dark border-border-dark hover:border-brand-red"
                    }
                  `}
                >
                  <span className={`
                    font-medium text-sm sm:text-base
                    ${isSelected ? "text-brand-red" : "text-text-primary"}
                  `}>
                    {region.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Country Selection */}
        {selectedRegion && selectedRegion !== "all" && availableCountries.length > 0 && (
          <div className="bg-bg-card-dark rounded-xl p-4 sm:p-6 border border-border-dark">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <MapPin className="w-5 h-5 text-brand-red" />
              <h3 className="font-semibold text-text-primary text-sm sm:text-base">
                Select Your Country
              </h3>
              <span className="text-text-secondary text-sm sm:text-base">
                (Optional but recommended)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableCountries.map((country) => {
                const isSelected = selectedCountry === country;
                return (
                  <button
                    key={country}
                    onClick={() => onCountrySelect(country)}
                    className={`
                      p-3 sm:p-4 rounded-lg border-2 text-left transition-all duration-200
                      ${isSelected
                        ? "bg-bg-dark border-brand-red"
                        : "bg-bg-dark border-border-dark hover:border-brand-red"
                      }
                    `}
                  >
                    <span className={`
                      text-sm sm:text-base font-medium
                      ${isSelected ? "text-brand-red" : "text-text-primary"}
                    `}>
                      {country}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-border-dark">
              <p className="text-text-secondary text-sm sm:text-base">
                Don't see your country? Select your region only, and we'll show agencies that can help.
              </p>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-bg-card-dark border border-border-dark rounded-lg p-3 sm:p-4">
          <p className="text-text-primary text-sm sm:text-base">
            <strong>Why do we ask?</strong> Different regions have different fraud reporting agencies.
            This ensures we recommend agencies with jurisdiction in your area.
          </p>
        </div>

      </div>
    </div>
  );
}
