"use client";

import {
  ShieldCheck,
  Users,
  CheckCircle,
  RefreshCw,
  Globe2,
  FileSearch,
} from "lucide-react";

const items = [
  {
    icon: Globe2,
    title: "Official Government Sources",
    desc: "We gather information from verified national and international government agencies.",
  },
  {
    icon: ShieldCheck,
    title: "Reputable Non-Profit Organizations",
    desc: "Data comes from recognized non-profits focused on consumer protection and fraud prevention.",
  },
  {
    icon: FileSearch,
    title: "Cross-Referencing & Validation",
    desc: "Every submission undergoes multi-source validation to ensure accuracy.",
  },
  {
    icon: Users,
    title: "Expert Review Panel",
    desc: "Cybersecurity and fraud-prevention professionals help verify and review listed resources.",
  },
  {
    icon: CheckCircle,
    title: "Community & User Feedback",
    desc: "We rely on user reports to identify outdated information or recommend new resources.",
  },
  {
    icon: RefreshCw,
    title: "Regular Updates & Maintenance",
    desc: "Our database is continuously updated to ensure it remains accurate and relevant.",
  },
];

export default function VerificationGrid() {
  return (
    <section className="py-16 px-6 sm:px-10 bg-bg-card-dark/40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-10">
          How We Source & Verify Information
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="
                p-6 bg-bg-card-dark rounded-xl border border-bg-card-dark 
                hover:border-brand-rose transition 
                text-center sm:text-left
                flex flex-col items-center sm:items-start
              "
            >
              <item.icon className="w-10 h-10 text-brand-rose mb-4 mx-auto sm:mx-0" />

              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

              <p className="text-text-secondary text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
