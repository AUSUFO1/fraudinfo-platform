"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, ShieldCheck, Siren, Waypoints } from "lucide-react";

const quickSignals = [
  "Verify suspicious websites and links",
  "Find the right fraud-reporting agencies",
  "Track official scam warnings in one place",
];

const proofItems = [
  { label: "Guided reporting flow", value: "4-step" },
  { label: "Verified public resources", value: "20+" },
  { label: "Live alert surfaces", value: "Multi-source" },
];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim()) {
      router.push(`/infosearch?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-18 lg:px-8 lg:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="section-frame graph-panel depth-card relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-10 top-10 opacity-60 lg:hidden">
            <div className="scanner-orb flex h-[160px] w-[160px] items-center justify-center rounded-full border border-white/10 bg-[rgba(13,20,35,0.45)]">
              <div className="scanner-line" />
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative z-10">
              <h1 className="reveal-up max-w-3xl font-[var(--font-syne)] text-4xl font-semibold leading-[0.96] tracking-[-0.06em] text-text-primary sm:text-5xl lg:text-7xl">
                A cleaner way to detect, verify, and respond to fraud.
              </h1>

              <p className="reveal-up reveal-delay-1 mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                FraudInfo helps people investigate suspicious activity, find the
                right reporting bodies, and respond with confidence before more
                damage is done.
              </p>

              <form
                onSubmit={handleSubmit}
                className="reveal-up reveal-delay-2 mt-8 hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-3 sm:block"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.25rem] border border-white/10 bg-bg-dark/70 px-3 py-3 text-text-secondary">
                    <Search className="h-4 w-4 shrink-0 text-text-tertiary sm:h-5 sm:w-5" />
                    <input
                      type="text"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search agencies, fraud types, or suspicious terms"
                      className="min-w-0 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-[13px] placeholder:text-text-tertiary sm:text-base sm:placeholder:text-base"
                    />
                  </label>
                  <button
                    type="submit"
                    className="pill-button pill-button-primary justify-center self-stretch px-5 py-3 sm:w-auto sm:self-auto"
                  >
                    <span className="sm:hidden">Search</span>
                    <span className="hidden sm:inline">Search intelligence</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </form>

              <div className="reveal-up reveal-delay-3 mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => router.push("/report")}
                  className="pill-button pill-button-primary min-h-12 justify-center"
                >
                  Start a report
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/agencies")}
                  className="pill-button pill-button-secondary min-h-12 justify-center"
                >
                  Browse agencies
                </button>
              </div>

              <div className="reveal-up reveal-delay-4 mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                {proofItems.map((item) => (
                  <div key={item.label}>
                    <p className="text-2xl font-semibold text-text-primary">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scanner-shell scanner-boot graph-panel-active relative hidden rounded-[1.85rem] border border-white/10 bg-[rgba(11,18,32,0.58)] p-5 lg:block">
              <div className="scanner-grid" />
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                <span>Signal scan active</span>
                <span>v1 intelligence</span>
              </div>
              <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[1.65rem] border border-white/10 bg-[rgba(13,20,35,0.82)]">
                <div className="scanner-orb flex h-[250px] w-[250px] items-center justify-center rounded-full border border-white/10 bg-[rgba(13,20,35,0.82)]">
                  <div className="scanner-line" />
                  <div className="text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                      Initializing scan
                    </p>
                    <p className="mt-2 font-[var(--font-syne)] text-4xl font-semibold tracking-[-0.05em] text-text-primary">
                      Threat map
                    </p>
                    <p className="mt-3 text-sm text-text-secondary">
                      Signals, agencies, action paths
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-12 bottom-8 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
