// components/prevention/PreventionResources.tsx
import Link from "next/link";

const list = [
  {
    label: "EFCC Fraud Reporting Guide",
    url: "https://efccnigeria.org",
  },
  {
    label: "FTC Scam Awareness",
    url: "https://www.ftc.gov",
  },
  {
    label: "Action Fraud UK Resources",
    url: "https://www.actionfraud.police.uk",
  },
];

export default function PreventionResources() {
  return (
    <section className="py-20 px-6 sm:px-10 bg-bg-card-dark border-t border-bg-dark">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Useful Resources</h2>

        <div className="space-y-4">
          {list.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              target="_blank"
              className="block p-4 rounded-md bg-bg-dark border border-bg-card-dark hover:border-brand-rose transition text-text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
