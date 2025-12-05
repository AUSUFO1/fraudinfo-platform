"use client";

import React, { useState } from "react";
import { Shield, Wrench, Newspaper, Share2, Grid, Search } from "lucide-react";
import ResourceCard from "../cards/ResourceCard";
import { fraudResources, resourceCategories } from "@/lib/fraud-resources";

const FraudResourcesSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Changed to null initially
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = fraudResources.filter((resource) => {
    // If no category selected, don't show any resources
    if (activeCategory === null) return false;
    
    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;

    const matchesSearch =
      searchQuery === "" ||
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Grid":
        return <Grid className="w-5 h-5 text-brand-red" />;
      case "Wrench":
        return <Wrench className="w-5 h-5 text-brand-red" />;
      case "Newspaper":
        return <Newspaper className="w-5 h-5 text-brand-rose" />;
      case "Share2":
        return <Share2 className="w-5 h-5 text-brand-red" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-brand-rose" />;
      default:
        return <Grid className="w-5 h-5 text-brand-red" />;
    }
  };

  return (
    <section className="py-16 bg-linear-to-b from-bg-dark to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/20 rounded-full mb-4">
            <Shield className="w-4 h-4 text-brand-red" />
            <span className="text-brand-red text-sm font-semibold">
              Fraud Resources
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Your Fraud-Fighting</span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-red to-brand-rose">
              Arsenal
            </span>
          </h2>

          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Verified tools, blogs, and resources from trusted sources to help
            you stay protected
          </p>
        </div>

        {/* SEARCH BAR - Only show when category is selected */}
        {activeCategory !== null && (
          <div className="mb-8">
            <div className="relative max-w-md mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />

              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-bg-card-dark border border-border-dark rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
          </div>
        )}

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {resourceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium transition-all text-sm md:text-base ${
                activeCategory === category.id
                  ? "bg-brand-red text-white shadow-lg shadow-brand-red/20"
                  : "bg-bg-card-dark text-text-secondary border border-border-dark hover:border-brand-red hover:text-white"
              }`}
            >
              {getCategoryIcon(category.icon)}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* RESOURCE GRID - Only show when category is selected */}
        {activeCategory === null ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-card-dark mb-4">
              <Grid className="w-8 h-8 text-text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Select a Category
            </h3>
            <p className="text-text-secondary">
              Choose a category above to explore fraud-fighting resources
            </p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-card-dark mb-4">
              <Search className="w-8 h-8 text-text-secondary" />
            </div>
            <p className="text-text-secondary">
              No resources found matching your search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}

        {/* FOOTER TEXT - Only show when resources are displayed */}
        {activeCategory !== null && filteredResources.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-text-secondary">
              All resources are verified and regularly updated. Report issues or
              suggest new resources via our contact page.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FraudResourcesSection;