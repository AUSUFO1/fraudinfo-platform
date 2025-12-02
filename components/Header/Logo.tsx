"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="shrink-0">
      <Link href="/">
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.05, rotate: 3 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
        >
          <Image
            src="/images/logo.png"
            alt="FraudInfo Logo"
            width={150}
            height={40}
            priority
            className="w-32 h-auto md:w-40"
          />
        </motion.div>
      </Link>
    </div>
  );
}