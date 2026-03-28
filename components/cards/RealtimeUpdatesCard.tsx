"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Bolt,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface AlertItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function RealTimeUpdatesCard() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/alerts?pageSize=10", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to reach alert services.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Unable to fetch alerts right now.");
      }

      setAlerts((data.items || []).slice(0, 4));
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load official alerts right now.";
      setError(message);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <article className="section-frame rounded-[1.75rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-text-primary">
            <Bolt className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-text-secondary">
              Verified signals
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-text-primary">
              Official alerts
            </h3>
          </div>
        </div>
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin text-text-secondary" />
        ) : null}
      </div>

      <div className="mt-6 space-y-3">
        {loading && alerts.length === 0 ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-8 text-sm text-text-secondary">
            Loading official alert sources.
          </div>
        ) : error ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Alerts are temporarily unavailable
                </p>
                <p className="mt-1 text-sm leading-6 text-text-secondary">
                  {error}
                </p>
              </div>
            </div>
          </div>
        ) : alerts.length === 0 ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-8 text-sm text-text-secondary">
            No official alerts are available right now.
          </div>
        ) : (
          alerts.map((alert) => (
            <a
              key={alert.id}
              href={alert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium leading-6 text-text-primary">
                    {alert.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {alert.description}
                  </p>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-text-tertiary" />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.08em] text-text-tertiary">
                <span>{alert.source}</span>
                <span>{formatDate(alert.pubDate)}</span>
              </div>
            </a>
          ))
        )}
      </div>
    </article>
  );
}
