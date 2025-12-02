"use client";

import HeroButton from "../Hero/HeroButton";
import HeroSearch from "../Hero/HeroSearch";

export default function Hero() {
  return (
    <section className="relative h-[500px] flex flex-col justify-center items-center text-center px-4">
      {/* Tagline */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
        <span className="text-white">Protect Yourself Against </span>
        <span className="text-brand-red">Online Fraud</span>
      </h1>

      {/* Description */}
      <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
        Access verified fraud reporting agencies, real-time alerts, and prevention guides.
      </p>

      {/* Search Input */}
      <HeroSearch />

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <HeroButton text="Report Fraud" variant="primary" />
        <HeroButton text="Browse Agencies" variant="secondary" />
      </div>
    </section>
  );
}
