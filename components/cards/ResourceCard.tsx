"use client";

import {
  CheckCircle2,
  ExternalLink,
  Newspaper,
  Share2,
  Shield,
  Wrench,
} from "lucide-react";
import { FraudResource } from "@/lib/fraud-resources";

interface ResourceCardProps {
  resource: FraudResource;
}

const categoryIconMap = {
  tool: Wrench,
  blog: Newspaper,
  social: Share2,
  agency: Shield,
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = categoryIconMap[resource.category] ?? Shield;

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-[rgba(11,18,32,0.85)] p-5 transition-colors hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-brand-red">
          <Icon className="h-4 w-4" />
        </span>
        {resource.verified ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-text-primary transition-colors group-hover:text-white">
        {resource.name}
      </h3>
      <p className="mt-3 grow text-sm leading-6 text-text-secondary">
        {resource.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {resource.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
        <span className="capitalize text-text-secondary">{resource.category}</span>
        <span className="inline-flex items-center gap-2 font-medium text-text-primary">
          Open
          <ExternalLink className="h-4 w-4 text-text-secondary transition-colors group-hover:text-text-primary" />
        </span>
      </div>
    </a>
  );
}
