"use client";

import React from "react";
import {
  ExternalLink,
  CheckCircle,
  Wrench,
  Newspaper,
  Share2,
  Shield,
} from "lucide-react";
import { FraudResource } from "@/lib/fraud-resources";

interface ResourceCardProps {
  resource: FraudResource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getCategoryIcon = () => {
    switch (resource.category) {
      case "tool":
        return <Wrench className="w-5 h-5 text-brand-red" />;
      case "blog":
        return <Newspaper className="w-5 h-5 text-brand-rose" />;
      case "social":
        return <Share2 className="w-5 h-5 text-brand-red" />;
      case "agency":
        return <Shield className="w-5 h-5 text-brand-rose" />;
      default:
        return <Shield className="w-5 h-5 text-brand-red" />;
    }
  };

  const getCategoryTextColor = () => {
    switch (resource.category) {
      case "tool":
      case "social":
        return "text-brand-red";
      case "blog":
      case "agency":
        return "text-brand-rose";
      default:
        return "text-text-primary";
    }
  };

  const getCardBorder = () => {
    switch (resource.category) {
      case "tool":
      case "social":
        return "border-brand-red/25 hover:border-brand-red";
      case "blog":
      case "agency":
        return "border-brand-rose/25 hover:border-brand-rose";
      default:
        return "border-border-dark";
    }
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block p-4 md:p-5 rounded-xl border bg-bg-card-dark transition-all duration-300 hover:shadow-xl hover:scale-[1.03] ${getCardBorder()}`}
    >
      {/* TOP ROW */}
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-bg-card-dark/40 ${getCategoryTextColor()}`}>
          {getCategoryIcon()}
        </div>

        {resource.verified && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-brand-red/20 text-brand-red text-xs font-semibold rounded-full">
            <CheckCircle className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* TITLE */}
      <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-brand-red transition-colors">
        {resource.name}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-xs md:text-sm text-text-secondary mb-3 line-clamp-2">
        {resource.description}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mb-3">
        {resource.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-bg-card-dark/40 text-text-secondary text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* FOOTER ROW */}
      <div className="flex items-center justify-between pt-3 border-t border-border-dark">
        <span className={`text-xs font-medium ${getCategoryTextColor()}`}>
          {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
        </span>

        <ExternalLink className="w-4 h-4 text-text-secondary group-hover:text-white transition-colors" />
      </div>
    </a>
  );
};

export default ResourceCard;
