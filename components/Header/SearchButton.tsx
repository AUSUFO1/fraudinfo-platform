"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Search"
      className="p-2 rounded-lg text-text-secondary hover:text-brand-rose transition-colors"
    >
      <Search className="w-5 h-5" />
    </motion.button>
  );
}
