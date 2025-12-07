// components/prevention/PreventionResources.tsx
import Link from "next/link";

const resources = [
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
  {
    label: "Nigerian Police Force - Cybercrime Unit",
    url: "https://www.npf.gov.ng",
  },
  {
    label: "FBI Internet Crime Complaint Center",
    url: "https://www.ic3.gov",
  },
  {
    label: "Interpol Cybercrime Prevention",
    url: "https://www.interpol.int/Crimes/Cybercrime",
  },
];

const youtubeChannels = [
  {
    label: "Scammer Payback - Exposing Scammers",
    url: "https://www.youtube.com/@ScammerPayback",
  },
  {
    label: "Jim Browning - Scam Investigations",
    url: "https://www.youtube.com/@JimBrowning",
  },
  {
    label: "Kitboga - Scam Education & Entertainment",
    url: "https://www.youtube.com/@KitbogaShow",
  },
  {
    label: "Pleasant Green - Fraud Awareness",
    url: "https://www.youtube.com/@PleasantGreen",
  },
  {
    label: "Atomic Shrimp - Scam Baiting & Analysis",
    url: "https://www.youtube.com/@AtomicShrimp",
  },
  {
    label: "Trilogy Media - Scam Investigation",
    url: "https://www.youtube.com/@TrilogyMediaGroup",
  },
];

export default function PreventionResources() {
  return (
    <section className="py-20 px-6 sm:px-10 bg-bg-card-dark border-t border-bg-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-10 text-center">Useful Resources</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Official Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-rose">Official Fraud Prevention Sites</h3>
            <div className="space-y-3">
              {resources.map((item) => (
                <Link
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-md bg-bg-dark border border-bg-card-dark hover:border-brand-rose transition text-text-secondary hover:text-text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - YouTube Channels */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-rose">Educational YouTube Channels</h3>
            <div className="space-y-3">
              {youtubeChannels.map((item) => (
                <Link
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-md bg-bg-dark border border-bg-card-dark hover:border-brand-rose transition text-text-secondary hover:text-text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}