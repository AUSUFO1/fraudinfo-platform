"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Globe, Search, ShieldCheck, TriangleAlert } from "lucide-react";
import { CHECKER_PROVIDERS } from "@/lib/product-features";

function normalizeInput(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const withProtocol =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`;
    const url = new URL(withProtocol);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return trimmed.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  }
}

export default function CheckerPage() {
  const [value, setValue] = useState("");
  const normalized = useMemo(() => normalizeInput(value), [value]);

  const signals = useMemo(() => {
    if (!normalized) return [];

    const lower = normalized.toLowerCase();
    const results: string[] = [];

    if (lower.includes("-") || lower.split(".")[0].length > 18) {
      results.push("Long or awkward domain naming can be worth checking.");
    }
    if (!lower.includes(".")) {
      results.push("This does not look like a complete domain yet.");
    }
    if (/\d/.test(lower.split(".")[0])) {
      results.push("Numbers in the brand portion can indicate impersonation.");
    }

    return results;
  }, [normalized]);

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="section-frame graph-panel graph-panel-active depth-card rounded-[2rem] p-7 sm:p-10">
          <span className="eyebrow">Verification workspace</span>
          <h1 className="mt-5 font-[var(--font-syne)] text-4xl font-semibold tracking-[-0.06em] text-text-primary sm:text-5xl">
            Check a website or link before you trust it.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary sm:text-lg">
            Run a fast verification routine before you click, sign in, send
            money, or share personal information.
          </p>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.25rem] border border-white/10 bg-bg-dark/70 px-3 py-3 text-text-secondary">
                <Search className="h-4 w-4 shrink-0 text-text-tertiary sm:h-5 sm:w-5" />
                <input
                  type="text"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="Enter a domain or suspicious URL"
                  className="min-w-0 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary sm:text-base"
                />
              </label>
              <div className="rounded-[1.25rem] border border-white/10 bg-bg-dark/70 px-4 py-3 text-sm text-text-secondary">
                Parsed target:{" "}
                <span className="font-semibold text-text-primary">
                  {normalized || "Waiting for input"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr]">
          <aside className="space-y-6">
            <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-text-primary">
                How to interpret signals
              </h2>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-white/10 px-4 py-3">
                  <p className="text-sm font-medium text-text-primary">Registration age</p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">
                    Newly created domains deserve extra scrutiny when they imitate a known brand.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 px-4 py-3">
                  <p className="text-sm font-medium text-text-primary">Reputation consensus</p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">
                    One clean score is not enough. Check multiple trusted sources before acting.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 px-4 py-3">
                  <p className="text-sm font-medium text-text-primary">Brand mismatch</p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">
                    Watch for subdomains, typos, extra words, or numbers that mimic a real service.
                  </p>
                </div>
              </div>
            </section>

            {signals.length > 0 ? (
              <section className="rounded-[1.75rem] border border-amber-400/20 bg-amber-500/10 p-6">
                <div className="flex items-center gap-2">
                  <TriangleAlert className="h-4 w-4 text-amber-300" />
                  <h2 className="text-lg font-semibold text-text-primary">
                    Quick flags
                  </h2>
                </div>
                <div className="mt-4 space-y-3">
                  {signals.map((signal) => (
                    <p key={signal} className="text-sm leading-6 text-amber-100">
                      {signal}
                    </p>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>

          <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-red" />
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                Verification steps
              </h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Open trusted external checks in sequence so you can validate the
              domain, inspect reputation, and spot warning signs early.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {CHECKER_PROVIDERS.map((provider, index) => (
                <a
                  key={provider.id}
                  href={provider.buildUrl(normalized || value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[1.5rem] border border-white/10 bg-bg-card-dark p-5 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                      Step {index + 1}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-text-tertiary transition-colors group-hover:text-text-primary" />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-text-primary">
                    {provider.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {provider.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {provider.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-bg-card-dark px-5 py-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-brand-red" />
                <p className="text-sm font-semibold text-text-primary">
                  Target under review
                </p>
              </div>
              <p className="mt-2 break-all text-sm leading-6 text-text-secondary">
                {normalized || "Enter a domain or URL to generate verification links and review guidance."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
