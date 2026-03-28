"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Platform" },
  { href: "/agencies", label: "Agencies" },
  { href: "/prevention", label: "Prevention" },
  { href: "/about", label: "About" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-primary transition-colors hover:border-white/20"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="menu-fade fixed inset-0 top-[76px] z-40 bg-[rgba(2,6,23,0.72)] backdrop-blur-sm"
          />

          <div className="fixed inset-x-0 top-[76px] z-50 border-b border-white/10 bg-bg-dark">
            <div className="mx-auto min-h-[calc(100dvh-76px)] max-w-7xl px-4 py-6 sm:px-6">
              <div className="menu-sheet rounded-[2rem] border border-white/10 bg-[rgba(17,26,43,0.92)] p-5 shadow-[0_24px_60px_rgba(2,6,23,0.45)]">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                  Navigation
                </p>

                <nav className="mt-5 flex flex-col">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`menu-link flex items-center justify-between border-b px-1 py-4 text-base font-medium transition-colors ${
                          isActive
                            ? "border-white/20 text-text-primary"
                            : "border-white/10 text-text-secondary hover:text-text-primary"
                        }`}
                        style={{ animationDelay: `${0.06 + navLinks.indexOf(link) * 0.05}s` }}
                      >
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  href="/report"
                  className="menu-link mt-6 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-white/20 hover:bg-white/8"
                  style={{ animationDelay: "0.28s" }}
                >
                  Report fraud
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
