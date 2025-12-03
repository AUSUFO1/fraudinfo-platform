"use client";

import React from "react";
import { Shield } from "lucide-react";

const WebsiteCheckerCard = () => {
  return (
    <div className="bg-bg-card-dark border border-border-dark rounded-lg p-6 text-text-primary relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-brand-red/10 rounded-lg">
          <Shield className="w-6 h-6 text-brand-red" />
        </div>
        <h3 className="text-xl font-bold text-text-primary">Website Checker</h3>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-text-secondary text-sm">
          Verify the safety and legitimacy of websites before you click. Our advanced scanning technology will help you identify:
        </p>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-brand-red mt-1">•</span>
            <span>Phishing sites and fake domains</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-red mt-1">•</span>
            <span>Malicious links and downloads</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-red mt-1">•</span>
            <span>Suspicious payment portals</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-red mt-1">•</span>
            <span>SSL certificate validation</span>
          </li>
        </ul>
      </div>

      {/* Coming Soon Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-linear-to-r from-brand-red to-brand-rose text-white text-xs font-bold rounded-full animate-pulse">
          COMING SOON
        </span>
      </div>

      {/* Disabled Input Preview */}
      <div className="mt-6 pt-4 border-t border-border-dark">
        <div className="relative opacity-50 cursor-not-allowed">
          <input
            type="text"
            placeholder="Enter website URL..."
            disabled
            className="w-full px-4 py-3 bg-bg-dark border border-border-dark rounded-lg text-sm text-text-primary"
          />
          <button
            disabled
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-brand-red text-white text-xs font-bold rounded"
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCheckerCard;
