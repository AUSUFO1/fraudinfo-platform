"use client";

import React from "react";
import { ExternalLink, Phone, Mail, Globe } from "lucide-react";
import type { Agency } from "@/lib/types";

interface AgencyCardProps {
  agency: Agency;
}

const AgencyCard = ({ agency }: AgencyCardProps) => {
  const getChannelIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Phone className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "website":
        return <Globe className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-bg-card-dark border border-border-dark rounded-xl p-5 flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1">{agency.name}</h3>
        <p className="text-text-secondary text-sm line-clamp-3">{agency.description}</p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {agency.reportingChannels.map((channel, index) => (
          <a
            key={index}
            href={channel.type === "website" ? channel.value : `mailto:${channel.value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors"
          >
            {getChannelIcon(channel.type)}
            <span>{channel.label}</span>
          </a>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-brand-red">{agency.category}</span>
        {agency.verified && (
          <span className="text-xs font-semibold text-brand-rose">Verified</span>
        )}
      </div>
    </div>
  );
};

export default AgencyCard;
