"use client";

import Link from "next/link";
import { ArrowUpRight, Shield } from "lucide-react";

export default function WebsiteCheckerCard() {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-bg-card-dark p-6 text-text-primary transition-colors hover:border-white/20">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
          <Shield className="h-5 w-5 text-brand-red" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Website Checker</h3>
          <p className="text-sm text-text-secondary">
            Verify domains and links through trusted sources
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <p className="text-sm leading-6 text-text-secondary">
          Launch a practical verification workflow that checks suspicious domains
          against reputation, registration, rendering, and unsafe-site sources.
        </p>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="mt-1 text-brand-red">&bull;</span>
            <span>Phishing sites and fake domains</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-brand-red">&bull;</span>
            <span>Malicious links and downloads</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-brand-red">&bull;</span>
            <span>Suspicious payment portals</span>
          </li>
        </ul>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <Link
          href="/checker"
          className="pill-button pill-button-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
        >
          Open website checker
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
