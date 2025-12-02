"use client";

import React from "react";

interface HeroButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function HeroButton({ text, variant = "primary", onClick }: HeroButtonProps) {
  const baseClasses = "px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold shadow-lg text-sm md:text-base transition-all duration-300";

  const variantClasses =
    variant === "primary"
      ? "bg-brand-red hover:bg-brand-rose text-white shadow-red-500/50 hover:shadow-xl"
      : "bg-white/90 text-gray-900 hover:bg-white shadow-gray-500/20";

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {text}
    </button>
  );
}
