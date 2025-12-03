export default function PreventionDetailedSection() {
  return (
    <section className="py-20 px-6 sm:px-10 bg-bg-card-dark border-y border-bg-dark">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">How Fraudsters Operate</h2>

        <p className="text-text-secondary leading-relaxed mb-4">
          Scammers rely on speed, emotion, and confusion. They use psychological
          manipulation, fake urgency, impersonation, and digital tricks to push
          victims into quick decisions. Understanding the methods below helps you
          stop attacks before they succeed.
        </p>

        <ul className="list-disc pl-6 space-y-3 text-text-secondary">
          <li>Impersonation of banks, agencies, or officials</li>
          <li>Fake investment promises with guaranteed returns</li>
          <li>Threats, fear, or urgency to pressure victims</li>
          <li>Phishing emails or fake login pages</li>
          <li>SIM swap or OTP hijacking attacks</li>
        </ul>
      </div>
    </section>
  );
}
