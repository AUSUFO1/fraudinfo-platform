"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ExternalLink,
  Loader2,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

interface RSSItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function TrendingScamsCard() {
  const [scams, setScams] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/rss", { cache: "no-store" });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.userMessage || "Unable to load news feed");
      }

      const data = await response.json();

      if (data.success && data.items?.length) {
        setScams(data.items.slice(0, 4));
      } else {
        throw new Error(data?.userMessage || "No news available right now");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unable to load news feed";
      setError(message);
      setScams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <article className="section-frame rounded-[1.75rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-brand-red">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-text-secondary">Live feed</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-text-primary">
              Trending scams
            </h3>
          </div>
        </div>
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin text-text-secondary" />
        ) : null}
      </div>

      <div className="mt-6 space-y-3">
        {loading && scams.length === 0 ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-8 text-sm text-text-secondary">
            Loading latest scam reports.
          </div>
        ) : error ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Feed temporarily unavailable
                </p>
                <p className="mt-1 text-sm leading-6 text-text-secondary">
                  {error}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={loadFeed}
              disabled={loading}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary transition-colors hover:border-white/20 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Retry
            </button>
          </div>
        ) : (
          scams.map((scam) => (
            <a
              key={scam.id}
              href={scam.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-6 text-text-primary">
                  {scam.title}
                </p>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-text-tertiary" />
              </div>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {scam.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.08em] text-text-tertiary">
                <span>{scam.source}</span>
                <span>{formatDate(scam.pubDate)}</span>
              </div>
            </a>
          ))
        )}
      </div>
    </article>
  );
}
