"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, AlertCircle, Clock, ExternalLink, Loader2, RefreshCw } from "lucide-react";

interface RSSItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

const TrendingScamsCard = () => {
  const [scams, setScams] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 60) {
        return `${diffMins} mins ago`;
      } else if (diffHours < 24) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
      } else if (diffDays < 7) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    } catch {
      return 'Recently';
    }
  };

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/rss', { cache: 'no-store' });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const userMessage = data?.userMessage || 'Unable to load news feed';
        throw new Error(userMessage);
      }

      const data = await response.json();

      if (data.success && data.items && data.items.length > 0) {
        setScams(data.items.slice(0, 5));
        setError(null);
      } else {
        throw new Error(data?.userMessage || 'No news available right now');
      }
    } catch (err: any) {
      console.error('Failed to load trending scams:', err);
      setError(err?.message || 'Unable to load news feed');
      setScams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
    const interval = setInterval(loadFeed, 600_000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (index: number) => {
    if (index % 3 === 0) return "text-brand-red";
    if (index % 3 === 1) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <div className="bg-bg-card-dark border border-border-dark rounded-lg p-6 text-text-primary transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] group cursor-pointer">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-brand-red/10 rounded-lg">
          <TrendingUp className="w-6 h-6 text-brand-red" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-primary">Trending Scams</h3>
          <p className="text-xs text-text-secondary">Live news feed</p>
        </div>
        {loading && <Loader2 className="w-5 h-5 text-brand-red animate-spin" />}
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        {loading && scams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-text-secondary">
            <Loader2 className="w-8 h-8 mb-3 animate-spin" />
            <p className="text-sm">Loading latest scams...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="w-8 h-8 mb-3 text-yellow-500" />
            <p className="text-sm text-text-secondary mb-1">
              Unable to load news feed
            </p>
            <p className="text-xs text-text-muted mb-4">
              Try refreshing in a moment
            </p>
            <button
              onClick={loadFeed}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-brand-red hover:bg-brand-rose disabled:bg-text-muted disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        ) : scams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-text-secondary">
            <AlertCircle className="w-8 h-8 mb-3" />
            <p className="text-sm">No recent scams found</p>
          </div>
        ) : (
          scams.map((scam, index) => (
            <a
              key={scam.id}
              href={scam.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-bg-dark rounded-lg border border-border-dark hover:border-brand-red transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm line-clamp-2 flex-1 pr-2">{scam.title}</h4>
                <AlertCircle className={`w-4 h-4 ${getSeverityColor(index)} shrink-0`} />
              </div>
              <p className="text-xs text-text-secondary mb-2 line-clamp-2">{scam.description}</p>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(scam.pubDate)}</span>
                </div>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border-dark">
        <a
          href="https://news.google.com/search?q=scam+fraud"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-brand-red hover:text-brand-rose transition-colors"
        >
          View All Trends
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default TrendingScamsCard;