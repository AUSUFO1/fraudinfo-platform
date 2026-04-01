import RealtimeUpdatesCard from "../cards/RealtimeUpdatesCard";
import TrendingScamsCard from "../cards/TrendingScamsCard";
import WebsiteCheckerCard from "../cards/WebsiteCheckerCard";
import Link from "next/link";
import { ShieldCheck, Siren, Waypoints } from "lucide-react";

const capabilities = [
  {
    title: "Live scam monitoring",
    description:
      "Keep a current view of emerging narratives, fake brands, and scam mechanics.",
  },
  {
    title: "Trusted agency lookup",
    description:
      "Match incidents with official regional reporting channels instead of generic search results.",
  },
  {
    title: "Actionable prevention guidance",
    description:
      "Give users practical next steps before they click, pay, reply, or disclose details.",
  },
];

const quickSignals = [
  "Verify suspicious websites and links",
  "Find the right fraud-reporting agencies",
  "Track official scam warnings in one place",
];

export default function StatsCards() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="eyebrow">Intelligence layer</span>
          <h2 className="mt-5 font-[var(--font-syne)] text-3xl font-semibold tracking-[-0.05em] text-text-primary sm:text-5xl">
            Built for people who need clear next steps when fraud hits.
          </h2>
          <p className="mt-5 text-base leading-7 text-text-secondary sm:text-lg">
            Monitor active scam signals, verify suspicious activity, and move
            quickly toward trusted reporting and prevention actions.
          </p>
        </div>

        <div className="reveal-soft mt-10 section-frame graph-panel graph-panel-active depth-card rounded-[1.75rem] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">
                Response model
              </p>
              <h3 className="mt-1 font-[var(--font-syne)] text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                How FraudInfo helps users move
              </h3>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-brand-red">
              Live
            </span>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {quickSignals.map((signal, index) => {
              const Icon = index === 0 ? Waypoints : index === 1 ? ShieldCheck : Siren;

              return (
                <div
                  key={signal}
                  className="signal-card rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-brand-red">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="mt-4 text-sm font-medium text-text-primary">
                    {signal}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {index === 0
                      ? "Investigate suspicious URLs, brands, and scam language before engaging."
                      : index === 1
                        ? "Route users to trusted reporting bodies instead of leaving them to search manually."
                        : "Stay current with scam narratives and official agency communications."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="section-frame depth-card signal-card rounded-[1.75rem] p-6"
            >
              <p className="text-lg font-semibold text-text-primary">
                {capability.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {capability.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <WebsiteCheckerCard />
          <div className="signal-card rounded-[1.5rem] border border-white/10 bg-bg-card-dark p-6">
            <p className="text-sm font-medium text-text-secondary">Scam intelligence</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text-primary">
              Browse the pattern library and regional signal board.
            </h3>
            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Search scam scenarios, review red flags, and scan region-level signal
              summaries before you act or report.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                Scam patterns
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                Regional signals
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                Red-flag actions
              </span>
            </div>
            <Link
              href="/library"
              className="pill-button pill-button-primary mt-6 inline-flex w-full items-center justify-center sm:w-auto"
            >
              Open pattern library
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <TrendingScamsCard />
          <RealtimeUpdatesCard />
        </div>
      </div>
    </section>
  );
}
