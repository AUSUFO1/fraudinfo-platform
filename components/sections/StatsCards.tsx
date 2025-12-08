"use client";

import React from "react";
import TrendingScamsCard from "../cards/TrendingScamsCard";
import RealtimeUpdatesCard from "../cards/RealtimeUpdatesCard";
const StatsCards = () => {
  return (
    <section className="py-16 bg-linear-to-b from-bg-dark to-black">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-primary">
            Stay Informed, Stay Protected
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Real-time fraud alerts and scam trends to keep you one step ahead
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <TrendingScamsCard />
          <RealtimeUpdatesCard />
        </div>
      </div>
    </section>
  );
};

export default StatsCards;
