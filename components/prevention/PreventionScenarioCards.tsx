"use client";

import { PhoneOff, CreditCard, Globe } from "lucide-react";

const scenarios = [
  {
    icon: PhoneOff,
    title: "Suspicious Calls",
    desc: "Unknown callers claiming to be from the bank or government.",
  },
  {
    icon: CreditCard,
    title: "Payment Scams",
    desc: "Requests for upfront payments, PINs, or OTP codes.",
  },
  {
    icon: Globe,
    title: "Fake Websites",
    desc: "Lookalike platforms designed to steal login details.",
  },
];

export default function PreventionScenarioCards() {
  return (
    <section className="py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Common Scam Scenarios</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s) => (
            <div
              key={s.title}
              className="bg-bg-card-dark p-4 sm:p-6 rounded-lg border border-bg-card-dark hover:border-brand-rose transition flex flex-col items-center text-center"
            >
              <s.icon className="w-8 h-8 sm:w-10 sm:h-10 text-brand-rose mb-3" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-text-secondary text-xs sm:text-sm">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
