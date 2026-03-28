"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Ban,
  Building2,
  Briefcase,
  CreditCard,
  DollarSign,
  ExternalLink,
  Heart,
  Laptop,
  Mail,
  Search,
  ShieldAlert,
  ShoppingCart,
} from "lucide-react";
import AgencyRecommendations from "@/components/report/AgencyRecommendations";
import { REGIONS } from "@/lib/fraud-data";
import { FRAUD_TYPES, PREPARATION_CHECKLIST } from "@/lib/fraud-types";
import { TRIAGE_QUESTIONS, type TriageQuestion } from "@/lib/product-features";
import { recommendAgencies } from "@/lib/report-utils";

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

const fraudTypeIcons = {
  "romance-scam": Heart,
  "investment-fraud": Search,
  phishing: Mail,
  "online-shopping": ShoppingCart,
  "advance-fee": DollarSign,
  "tech-support": Laptop,
  employment: Briefcase,
  "bank-fraud": Building2,
} as const;

const prepIcons = {
  "gather-evidence": Search,
  "transaction-details": CreditCard,
  "scammer-info": Search,
  timeline: ShieldAlert,
  "stop-contact": Ban,
  "secure-accounts": ShieldAlert,
} as const;

export default function ReportFraudPage() {
  const [selectedFraudType, setSelectedFraudType] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("entry");
  const [triageGuidance, setTriageGuidance] = useState<string>("");
  const [triageTrail, setTriageTrail] = useState<string[]>([]);

  const currentQuestion = TRIAGE_QUESTIONS.find(
    (question) => question.id === currentQuestionId,
  ) as TriageQuestion | undefined;

  const availableCountries = selectedRegion
    ? COUNTRIES_BY_REGION[selectedRegion] || []
    : [];

  const recommendations = useMemo(() => {
    if (!selectedFraudType) return [];

    return recommendAgencies({
      fraudType: selectedFraudType,
      region: selectedRegion || undefined,
      country: selectedCountry || undefined,
    });
  }, [selectedCountry, selectedFraudType, selectedRegion]);

  const essentials = PREPARATION_CHECKLIST.filter((item) => item.required).slice(0, 4);

  const handleTriageAnswer = (
    question: TriageQuestion,
    option: TriageQuestion["options"][number],
  ) => {
    setTriageTrail((current) => [
      ...current.filter((entry) => !entry.startsWith(`${question.id}:`)),
      `${question.id}:${option.label}`,
    ]);

    if (option.fraudTypeId) setSelectedFraudType(option.fraudTypeId);
    if (option.guidance) setTriageGuidance(option.guidance);
    setCurrentQuestionId(option.next ?? "");
  };

  const resetTriage = () => {
    setCurrentQuestionId("entry");
    setTriageGuidance("");
    setTriageTrail([]);
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="section-frame graph-panel depth-card rounded-[2rem] p-7 sm:p-10">
          <span className="eyebrow">Reporting guidance</span>
          <h1 className="mt-5 font-[var(--font-syne)] text-4xl font-semibold tracking-[-0.06em] text-text-primary sm:text-5xl">
            Triage the incident and move into action faster.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary sm:text-lg">
            Identify the fraud pattern, narrow the right jurisdiction, and go
            straight to the agencies most likely to help.
          </p>
        </section>

        <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-6">
            <section className="graph-panel rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    Incident triage
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Answer a few questions and we will point you to the closest fraud path.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetTriage}
                  className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                >
                  Reset
                </button>
              </div>

              {currentQuestion ? (
                <div className="mt-5 space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                    {currentQuestion.prompt}
                  </p>
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleTriageAnswer(currentQuestion, option)}
                      className="w-full rounded-[1.35rem] border border-white/10 bg-bg-card-dark px-4 py-4 text-left text-sm font-medium text-text-primary transition-colors hover:border-white/20"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-bg-card-dark p-4">
                  <p className="text-sm font-semibold text-text-primary">Triage complete</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {triageGuidance || "A likely fraud path is now matched below. Review it and continue to agency selection."}
                  </p>
                </div>
              )}

              {triageTrail.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {triageTrail.map((entry) => (
                    <span
                      key={entry}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
                    >
                      {entry.split(":")[1]}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>

            <section className="graph-panel rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-text-primary">Core preparation</h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                These are the highest-signal preparation steps for most fraud reports.
              </p>

              <div className="mt-5 space-y-3">
                {essentials.map((item) => {
                  const Icon = prepIcons[item.id as keyof typeof prepIcons] ?? ShieldAlert;

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                          <Icon className="h-4 w-4 text-brand-red" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>

          <div className="space-y-8">
            <section className="graph-panel rounded-[1.75rem] border border-white/10 bg-white/5 p-6 sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                    Match the fraud type
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    If the triage path already identified the pattern, confirm it
                    here. Otherwise, choose the closest match directly.
                  </p>
                </div>
                {selectedFraudType ? (
                  <button
                    type="button"
                    onClick={() => setSelectedFraudType("")}
                    className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    Clear selection
                  </button>
                ) : null}
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {FRAUD_TYPES.map((fraudType) => {
                  const Icon =
                    fraudTypeIcons[fraudType.id as keyof typeof fraudTypeIcons] ?? ShieldAlert;
                  const isSelected = selectedFraudType === fraudType.id;

                  return (
                    <button
                      key={fraudType.id}
                      type="button"
                      onClick={() => setSelectedFraudType(fraudType.id)}
                      className={`rounded-[1.5rem] border p-5 text-left transition-colors ${
                        isSelected
                          ? "border-white/30 bg-white/10"
                          : "border-white/10 bg-bg-card-dark hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
                          <Icon className="h-5 w-5 text-brand-red" />
                        </span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
                          {fraudType.urgency}
                        </span>
                      </div>

                      <p className="mt-4 text-lg font-semibold text-text-primary">
                        {fraudType.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">
                        {fraudType.description}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-[0.08em] text-text-tertiary">
                        Example: {fraudType.examples[0]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="graph-panel rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-text-primary">
                Optional location filter
              </h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Add region or country when you want tighter agency matches.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-text-primary">
                    Region
                  </span>
                  <select
                    value={selectedRegion}
                    onChange={(event) => {
                      setSelectedRegion(event.target.value);
                      setSelectedCountry("");
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-bg-card-dark px-4 py-3 text-sm text-text-primary outline-none"
                  >
                    <option value="">Any region</option>
                    {REGIONS.filter((region) => region.value !== "all").map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-text-primary">
                    Country
                  </span>
                  <select
                    value={selectedCountry}
                    onChange={(event) => setSelectedCountry(event.target.value)}
                    disabled={availableCountries.length === 0}
                    className="w-full rounded-2xl border border-white/10 bg-bg-card-dark px-4 py-3 text-sm text-text-primary outline-none disabled:opacity-50"
                  >
                    <option value="">Any country in region</option>
                    {availableCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className="graph-panel graph-panel-active rounded-[1.75rem] border border-white/10 bg-[rgba(17,26,43,0.72)] p-6 sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                    Recommended agencies
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Start with the strongest agency match for this case, then use
                    the others if you need a wider reporting trail.
                  </p>
                </div>
                <a
                  href="/library"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary underline-offset-4 hover:underline"
                >
                  View scam library
                  <ExternalLink className="h-4 w-4 text-text-secondary" />
                </a>
              </div>

              <AgencyRecommendations
                recommendations={recommendations}
                fraudTypeId={selectedFraudType || undefined}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
