// components/prevention/PreventionPillars.tsx
import { ShieldCheck, Eye, Lock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Verify",
    text: "Always verify identities, websites, emails, and financial requests.",
  },
  {
    icon: Eye,
    title: "Stay Alert",
    text: "Recognize red flags early by understanding common scam signals.",
  },
  {
    icon: Lock,
    title: "Protect",
    text: "Use secure tools and best practices to protect your data.",
  },
];

export default function PreventionPillars() {
  return (
    <section className="py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="bg-bg-card-dark p-4 sm:p-6 rounded-lg border border-bg-card-dark hover:border-brand-rose transition flex flex-col items-center text-center"
          >
            <pillar.icon className="w-8 h-8 sm:w-10 sm:h-10 text-brand-rose mb-3" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">{pillar.title}</h3>
            <p className="text-text-secondary text-xs sm:text-sm">
              {pillar.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
