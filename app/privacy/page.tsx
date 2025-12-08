export default function PrivacyPage() {
  return (
    <section className="py-20 mt-4 px-4 text-text-primary">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-xl font-bold">Privacy Policy</h1>

        <p className="text-text-secondary text-sm">
          Your privacy is important to us. This Privacy Policy explains how FraudInfo 
          collects, uses, and protects information when you use our website.
        </p>

        <h2 className="text-lg font-semibold">1. Information We Do Not Collect</h2>
        <p className="text-text-secondary text-sm">
          FraudInfo does <strong>not</strong> collect personal data such as your name, address, 
          phone number, or government-issued identifiers. We do not store any user accounts, 
          login sessions, or personal submissions.
        </p>

        <h2 className="text-lg font-semibold">2. Information We Collect Automatically</h2>
        <p className="text-text-secondary text-sm">
          Like most websites, we may use basic analytics tools to collect non-personal data, 
          such as:
        </p>

        <ul className="list-disc pl-6 text-sm text-text-secondary space-y-2">
          <li>Browser type and version</li>
          <li>Device type (mobile/desktop)</li>
          <li>Anonymous site usage statistics</li>
          <li>Pages visited and time spent</li>
        </ul>

        <p className=" text-sm text-text-secondary">
          This information is used only to improve website performance and user experience.
        </p>

        <h2 className="text-lg font-semibold">3. Cookies</h2>
        <p className="text-text-secondary text-sm">
          FraudInfo may use optional, non-tracking cookies for improved functionality. 
          You may disable cookies in your browser at any time.
        </p>

        <h2 className="text-lg font-semibold">4. External Links & Reporting Portals</h2>
        <p className="text-smtext-text-secondary">
          FraudInfo contains links to official third-party reporting agencies (e.g., EFCC, 
          ICPC, FBI IC3). We do not control or monitor their privacy practices. 
          Any information you submit on third-party websites is governed solely by their 
          Privacy Policies.
        </p>

        <h2 className="text-lg font-semibold">5. Safety & Security</h2>
        <p className="text-text-secondary text-sm">
          FraudInfo does not store personal information. For general website security, 
          we use industry-standard measures including HTTPS encryption and secure hosting.
        </p>

        <h2 className="text-lg font-semibold">6. Children’s Privacy</h2>
        <p className="text-text-secondary text-sm">
          FraudInfo does not target or collect data from children under the age of 13.
        </p>

        <h2 className="text-lg font-semibold">7. Changes to This Policy</h2>
        <p className="text-text-secondary text-sm">
          We may update this Privacy Policy from time to time. Continued use of the website 
          indicates acceptance of any revisions.
        </p>

        <h2 className="text-lg font-semibold">8. Contact</h2>
        <p className="text-text-secondary text-sm">
          If you have questions about this Privacy Policy, please contact us at:
          <br />
          <a href="mailto:verifyfraud01@gmail.com" className="text-brand-rose underline">
            verifyfraud01@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
