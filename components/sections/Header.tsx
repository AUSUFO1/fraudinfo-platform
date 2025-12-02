"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../Header/Logo";
import DesktopNav from "../Header/DesktopNav";
import MobileNav from "../Header/MobileNav";
import SearchButton from "../Header/SearchButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-dark/95 backdrop-blur-md shadow-lg"
          : "bg-bg-dark shadow"
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <SearchButton />
            </div>

            {/* Mobile Menu */}
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
