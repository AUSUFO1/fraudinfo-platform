"use client";

import { useMemo, useState } from "react";
import {
  Grid,
  Newspaper,
  Search,
  Share2,
  Shield,
  Wrench,
} from "lucide-react";
import ResourceCard from "../cards/ResourceCard";
import { fraudResources, resourceCategories } from "@/lib/fraud-resources";

const categoryCopy: Record<string, string> = {
  all: "Browse the full toolkit across trusted tools, sources, feeds, and agencies.",
  tool: "Use practical verification tools before engaging with suspicious files, links, or domains.",
  blog: "Track reporting and editorial coverage that helps explain active scam patterns.",
  social: "Follow official channels that publish timely safety notices and warning campaigns.",
  agency: "Route users to legitimate institutions for complaints, escalation, and official guidance.",
};

const iconMap = {
  Grid,
  Wrench,
  Newspaper,
  Share2,
  Shield,
};

export default function FraudResourcesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return fraudResources.filter((resource) => {
      const matchesCategory =
        activeCategory === "all" || resource.category === activeCategory;
      const matchesSearch =
        searchQuery.trim().length === 0 ||
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[rgba(17,26,43,0.72)] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow">Resource network</span>
            <h2 className="mt-5 font-[var(--font-syne)] text-3xl font-semibold tracking-[-0.05em] text-text-primary sm:text-5xl">
              A curated fraud-fighting toolkit users can trust.
            </h2>
            <p className="mt-5 text-base leading-7 text-text-secondary">
              Explore trusted tools, official agencies, and credible fraud
              intelligence sources to verify threats and act with confidence.
            </p>
          </div>

          <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-text-secondary">
            <Search className="h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search tools, agencies, or trusted sources"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {resourceCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Grid;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-transparent bg-white text-slate-950"
                    : "border-white/10 bg-white/5 text-text-secondary hover:text-text-primary"
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm leading-6 text-text-secondary">
          {categoryCopy[activeCategory]}
        </div>

        {filteredResources.length === 0 ? (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-white/10 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-text-primary">
              No matching resources found.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Try a broader term or switch to another category.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
