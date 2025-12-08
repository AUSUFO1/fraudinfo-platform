"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-border-dark">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-4">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-text-primary font-semibold tracking-wide text-lg">
            FraudInfo
          </span>
        </motion.div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-text-primary">
          <a
            href="/privacy"
            className="hover:text-brand-rose transition-colors"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="hover:text-brand-rose transition-colors"
          >
            Terms
          </a>
          <a
            href="mailto:verifyfraud01@gmail.com"
            className="hover:text-brand-rose transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-text-primary mt-2 tracking-wide text-center">
          © {new Date().getFullYear()} FraudInfo — Stay Informed. Stay Protected.
        </p>
      </div>
    </footer>
  );
}
