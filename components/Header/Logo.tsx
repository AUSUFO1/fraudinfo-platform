"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <ShieldCheck className="h-5 w-5 text-brand-red" />
      </span>
      <span className="flex flex-col">
        <span className="font-[var(--font-syne)] text-lg font-semibold tracking-[-0.04em] text-text-primary">
          FraudInfo
        </span>
        <span className="text-xs text-text-secondary">
          Fraud response workspace
        </span>
      </span>
    </Link>
  );
}
