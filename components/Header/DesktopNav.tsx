"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Platform" },
  { href: "/agencies", label: "Agencies" },
  { href: "/prevention", label: "Prevention" },
  { href: "/about", label: "About" },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-8 lg:flex">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`border-b pb-1 text-sm font-medium transition-colors ${
              isActive
                ? "border-text-primary text-text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
