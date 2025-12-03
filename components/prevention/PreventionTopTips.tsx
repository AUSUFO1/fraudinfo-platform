
const tips = [
  "Never share OTPs, PINs, or passwords.",
  "Verify every transaction request before acting.",
  "Use unique passwords for all your accounts.",
  "Enable 2FA on banking and social apps.",
  "Check URLs carefully before entering credentials.",
];

export default function PreventionTopTips() {
  return (
    <section className="py-20 px-6 sm:px-10 bg-bg-dark">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2 font-semibold mb-6">Top Safety Tips</h2>

        <ul className="space-y-4">
          {tips.map((tip) => (
            <li
              key={tip}
              className="p-4 bg-bg-card-dark rounded-md border border-bg-card-dark hover:border-brand-rose transition"
            >
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
