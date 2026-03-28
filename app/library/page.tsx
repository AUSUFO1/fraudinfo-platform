"use client";

import { useMemo, useState } from "react";
import { Search, Signal } from "lucide-react";
import { REGIONAL_SIGNALS, SCAM_PATTERNS } from "@/lib/product-features";

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(
    () => ["all", ...new Set(SCAM_PATTERNS.map((pattern) => pattern.category))],
    [],
  );

  const filteredPatterns = useMemo(() => {
    return SCAM_PATTERNS.filter((pattern) => {
      const matchesCategory =
        activeCategory === "all" || pattern.category === activeCategory;
      const matchesQuery =
        query.trim().length === 0 ||
        pattern.title.toLowerCase().includes(query.toLowerCase()) ||
        pattern.summary.toLowerCase().includes(query.toLowerCase()) ||
        pattern.redFlags.some((flag) =>
          flag.toLowerCase().includes(query.toLowerCase()),
        );

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="section-frame graph-panel graph-panel-active depth-card rounded-[2rem] p-7 sm:p-10">
          <span className="eyebrow">Pattern intelligence</span>
          <h1 className="mt-5 font-[var(--font-syne)] text-4xl font-semibold tracking-[-0.06em] text-text-primary sm:text-5xl">
            Search the scam pattern library.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary sm:text-lg">
            Review common scam setups, learn the warning signs, and see which
            threat patterns are hitting different regions.
          </p>

          <label className="mt-8 flex w-full max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-text-secondary">
            <Search className="h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search scam names, red flags, or channels"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
          </label>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2">
            <Signal className="h-4 w-4 text-brand-red" />
            <h2 className="text-lg font-semibold text-text-primary">
              Regional signal board
            </h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {REGIONAL_SIGNALS.map((signal) => (
              <article
                key={signal.region}
                className="rounded-[1.5rem] border border-white/10 bg-bg-card-dark p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-text-primary">{signal.region}</p>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-red">
                    {signal.intensity}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {signal.signal}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {signal.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-transparent bg-white text-slate-950"
                      : "border-white/10 bg-bg-card-dark text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {category === "all" ? "All patterns" : category}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {filteredPatterns.map((pattern) => (
              <article
                key={pattern.id}
                className="rounded-[1.5rem] border border-white/10 bg-bg-card-dark p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                      {pattern.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                      {pattern.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-red">
                    {pattern.urgency}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  {pattern.summary}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Red flags</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
                      {pattern.redFlags.map((flag) => (
                        <li key={flag}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">What to do</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
                      {pattern.whatToDo.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {pattern.channels.map((channel) => (
                    <span
                      key={channel}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
