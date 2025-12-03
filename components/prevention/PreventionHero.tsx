"use client";

import { ShieldAlert } from "lucide-react";

export default function PreventionHero() {
  return (
    <section className="w-full py-24 px-6 sm:px-10 bg-bg-dark border-b border-bg-card-dark">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-12 h-12 text-brand-rose" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Fraud Prevention & Safety Guide
        </h1>

        <p className="text-text-secondary max-w-2xl mx-auto">
          Stay one step ahead of scammers. Learn how to spot, avoid, and defend
          against modern fraud techniques with practical guidance and tools.
        </p>
      </div>
    </section>
  );
}
