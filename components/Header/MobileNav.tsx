"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";
import SearchButton from "./SearchButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/agencies", label: "Agencies" },
  { href: "/prevention", label: "Prevention" },
  { href: "/check-website", label: "Check Website" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        className="md:hidden text-gray-700 dark:text-gray-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <motion.div
            initial={{ rotate: 0, scale: 0.95 }}
            animate={{ rotate: 90, scale: 1 }}
            transition={{ duration: 0.22 }}
          >
            <X className="w-7 h-7 text-brand-red" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div
            animate={{
              rotate: [0, -8, 8, -8, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Shield
              className="w-7 h-7 text-brand-red"
              strokeWidth={2}
              fill="currentColor"
            />
          </motion.div>
        )}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden absolute top-full left-0 right-0 w-full bg-gray-50 dark:bg-gray-900 mt-2 px-4 py-4 overflow-hidden border-t border-brand-red/20 rounded-b-lg"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -16, opacity: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`w-full text-left font-medium py-3 text-sm border-b border-gray-200 dark:border-gray-700 last:border-0 transition-colors ${
                        isActive
                          ? "text-brand-red dark:text-brand-rose"
                          : "text-gray-900 dark:text-white hover:text-brand-red dark:hover:text-brand-rose"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                <SearchButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}