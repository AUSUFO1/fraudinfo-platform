"use client";

import { useRouter } from "next/navigation";
import HeroButton from "../Hero/HeroButton";
import HeroSearch from "../Hero/HeroSearch";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative h-[500px] bg-linear-to-b from-bg-dark to-bg-card-dark flex flex-col justify-center items-center text-center px-4">

      {/* Tagline */}
      <h1 className="text-lG md:text-2xl lg:text-3xl font-bold leading-tight text-text-primary">
        Protect Yourself Against{" "}
        <span className="text-brand-red">Online Fraud</span>
      </h1>

      {/* Description */}
      <p className="mt-4 text-text-secondary max-w-2xl mx-auto text-base md:text-lg">
        Access verified fraud reporting agencies, real-time alerts, and prevention guides.
      </p>

      {/* Search Input */}
      <HeroSearch />

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <HeroButton
          text="Report Fraud"
          variant="primary"
          onClick={() => router.push("/report")}
        />
        <HeroButton
          text="Browse Agencies"
          variant="secondary"
          onClick={() => router.push("/agencies")}
        />
      </div>

    </section>
  );
}
