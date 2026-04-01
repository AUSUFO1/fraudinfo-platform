"use client";

import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { AgencyRecommendation, getFraudUrgency } from "@/lib/report-utils";

interface AgencyRecommendationsProps {
  recommendations: AgencyRecommendation[];
  fraudTypeId?: string;
}

const urgencyTone = {
  critical: "border-red-400/30 bg-red-500/10 text-red-100",
  high: "border-amber-400/30 bg-amber-500/10 text-amber-100",
  medium: "border-white/10 bg-white/5 text-text-primary",
  low: "border-white/10 bg-white/5 text-text-primary",
} as const;

export default function AgencyRecommendations({
  recommendations,
  fraudTypeId,
}: AgencyRecommendationsProps) {
  if (!fraudTypeId) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-bg-card-dark/50 px-6 py-12 text-center">
        <p className="text-lg font-semibold text-text-primary">
          Select a fraud type to get reporting options.
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          We will surface the best agencies immediately, and you can add
          location details if you want tighter matches.
        </p>
      </div>
    );
  }

  const urgency = getFraudUrgency(fraudTypeId);
  const urgencyKey = (["critical", "high", "medium", "low"].includes(urgency)
    ? urgency
    : "medium") as keyof typeof urgencyTone;

  if (recommendations.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-bg-card-dark/70 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-amber-300" />
          <div>
            <p className="text-lg font-semibold text-text-primary">
              No direct match found yet.
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Try changing the location filter or browse the full agency
              directory for more options.
            </p>
            <Link
              href="/agencies"
              className="mt-4 inline-flex text-sm font-semibold text-text-primary underline-offset-4 hover:underline"
            >
              Browse all agencies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`flex items-start gap-3 rounded-[1.25rem] border px-5 py-4 ${urgencyTone[urgencyKey]}`}
      >
        <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="text-sm font-semibold">Recommended timing</p>
          <p className="mt-1 text-sm leading-6 text-text-secondary">
            {urgency}
          </p>
        </div>
      </div>

      {recommendations.slice(0, 4).map((recommendation, index) => {
        const { agency, matchReasons } = recommendation;

        return (
          <article
            key={agency.id}
            className="rounded-[1.5rem] border border-white/10 bg-bg-card-dark/80 p-6"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                    {agency.shortName}
                  </h3>
                  {index === 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-red" />
                      Best match
                    </span>
                  ) : null}
                  {agency.verified ? (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-200">
                      Verified
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm text-text-secondary">{agency.name}</p>
                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  {agency.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {matchReasons.slice(0, 3).map((reason) => (
                    <span
                      key={reason}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-sm space-y-3">
                {agency.website ? (
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button pill-button-primary flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Visit website
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}

                {agency.phone ? (
                  <a
                    href={`tel:${agency.phone}`}
                    className="flex items-center gap-2 rounded-[1rem] border border-white/10 px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:border-white/20"
                  >
                    <Phone className="h-4 w-4 text-text-secondary" />
                    {agency.phone}
                  </a>
                ) : null}

                {agency.email ? (
                  <a
                    href={`mailto:${agency.email}`}
                    className="flex items-center gap-2 rounded-[1rem] border border-white/10 px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:border-white/20"
                  >
                    <Mail className="h-4 w-4 text-text-secondary" />
                    {agency.email}
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}

      <div className="pt-2">
        <Link
          href="/agencies"
          className="text-sm font-semibold text-text-primary underline-offset-4 hover:underline"
        >
          Need more options? Browse the full agency directory.
        </Link>
      </div>
    </div>
  );
}
