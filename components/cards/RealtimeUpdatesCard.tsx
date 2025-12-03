"use client";

import React, { useEffect, useState } from "react";
import { Bolt, Clock, ExternalLink, AlertCircle, Loader2 } from "lucide-react";

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

      const res = await fetch("/api/alerts?pageSize=10", { cache: "no-store" });

      if (!res.ok) {
        console.error("API Error Response:", await res.text());
        throw new Error("Unable to reach alert servers. Please try again later.");
      }

      const data = await res.json();

      if (!data.success) {
        console.error("API Data Error:", data.error);
        throw new Error("Unable to fetch alerts at the moment.");
      }

      setAlerts(data.items || []);
    } catch (err: any) {
      console.error("fetchAlerts error:", err);
      setError("Unable to load official alerts right now. Please try again later.");
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="bg-bg-card-dark border border-border-dark rounded-lg p-6 text-text-primary transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] group cursor-pointer">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-brand-red/10 rounded-lg">
          <Bolt className="w-6 h-6 text-brand-red" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-primary">Real-Time Updates</h3>
          <p className="text-xs text-text-secondary">Multi-agency verified alerts</p>
        </div>
        {loading && <Loader2 className="w-5 h-5 text-brand-red animate-spin" />}
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-text-secondary">
            <Loader2 className="w-8 h-8 mb-3 animate-spin" />
            <p className="text-sm">Loading official alerts...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 text-text-secondary">
            <AlertCircle className="w-8 h-8 mb-3 text-yellow-500" />
            <p className="text-sm text-center">{error}</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-text-secondary">
            <AlertCircle className="w-8 h-8 mb-3" />
            <p className="text-sm">No official alerts at the moment</p>
          </div>
        ) : (
          alerts.map((a) => (
            <a
              key={a.id}
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-bg-dark rounded-lg border border-border-dark hover:border-brand-red transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm line-clamp-2 flex-1 pr-2">{a.title}</h4>
                <div className="text-xs text-text-secondary">{a.source}</div>
              </div>
              <p className="text-xs text-text-secondary mb-2 line-clamp-2">{a.description}</p>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(a.pubDate)}</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}