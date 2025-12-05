"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/agencies", label: "Agencies" },
  { href: "/prevention", label: "Prevention" },
  { href: "/about", label: "About" },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
      <div className="flex items-center gap-8 lg:gap-12">
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.12 }}
            >
              <Link
                href={link.href}
                className={`font-medium text-sm relative group transition-colors ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-brand-red"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
