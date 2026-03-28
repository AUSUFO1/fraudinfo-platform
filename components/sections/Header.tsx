"use client";

import Link from "next/link";
import DesktopNav from "../Header/DesktopNav";
import Logo from "../Header/Logo";
import MobileNav from "../Header/MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(11,18,32,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-3">
          <DesktopNav />
          <Link
            href="/report"
            className="hidden border-b border-transparent pb-1 text-sm font-semibold text-text-primary transition-colors hover:border-white/40 lg:inline-flex"
          >
            Report fraud
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
