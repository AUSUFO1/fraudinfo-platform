import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-md">
          <p className="font-[var(--font-syne)] text-2xl font-semibold tracking-[-0.04em] text-text-primary">
            FraudInfo
          </p>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Clean fraud intelligence for people who need to verify a threat,
            report it quickly, and move forward with confidence.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-text-secondary sm:flex-row sm:items-center sm:gap-6">
          <Link href="/privacy" className="hover:text-text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-text-primary">
            Terms
          </Link>
          <a
            href="mailto:verifyfraud01@gmail.com"
            className="hover:text-text-primary"
          >
            Contact
          </a>
          <span className="text-text-tertiary">
            © {new Date().getFullYear()} FraudInfo
          </span>
        </div>
      </div>
    </footer>
  );
}
