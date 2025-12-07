"use client";

// Display recommended agencies with match reasons

import React from 'react';
import { AgencyRecommendation } from '@/lib/report-utils';
import { ExternalLink, Phone, Mail, Globe, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface AgencyRecommendationsProps {
  recommendations: AgencyRecommendation[];
  fraudTypeId?: string;
}

export default function AgencyRecommendations({ 
  recommendations,
  fraudTypeId 
}: AgencyRecommendationsProps) {

  if (recommendations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-bg-card-dark rounded-xl p-12 text-center border border-border-dark">
          <AlertCircle className="w-16 h-16 text-brand-red mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No Exact Matches Found
          </h3>
          <p className="text-text-secondary mb-6">
            We couldn't find agencies that exactly match your criteria. Try adjusting your location or fraud type.
          </p>
          <button
            onClick={() => window.location.href = '/infosearch'}
            className="px-6 py-3 bg-brand-red hover:bg-brand-rose text-text-primary rounded-lg font-semibold transition-colors"
          >
            Browse All Agencies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-3">
          Recommended Agencies
        </h2>
        <p className="text-text-secondary text-lg">
          Based on your fraud type and location, we recommend reporting to these agencies
        </p>
      </div>

      {/* Urgency Alert */}
      {fraudTypeId && (
        <div className="bg-bg-card-dark border border-brand-red rounded-lg p-4 mb-6 flex items-start gap-3">
          <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
          <div>
            <p className="text-text-primary font-semibold mb-1">Time Sensitive</p>
            <p className="text-text-secondary text-sm">
              Report as soon as possible. Quick reporting improves chances of investigation and recovery.
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="space-y-4 mb-8">
        {recommendations.map((rec, index) => {
          const { agency, matchReasons } = rec;
          const isBestMatch = index === 0;

          return (
            <div
              key={agency.id}
              className={`
                bg-bg-card-dark rounded-xl p-6 border-2 transition-all duration-300
                ${isBestMatch
                  ? 'border-brand-red'
                  : 'border-border-dark hover:border-brand-red'
                }
              `}
            >
              {/* Best Match Badge */}
              {isBestMatch && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-dark text-brand-red rounded-full text-xs font-semibold mb-4 border border-brand-red">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Best Match
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start gap-6">

                {/* Agency Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-1">
                        {agency.shortName}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {agency.name}
                      </p>
                    </div>

                    {agency.verified && (
                      <span className="bg-bg-dark text-brand-red text-xs px-2 py-1 rounded-full font-semibold border border-brand-red">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-text-secondary text-sm mb-4">
                    {agency.description}
                  </p>

                  {/* Match Reasons */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-text-secondary mb-2">
                      WHY RECOMMENDED:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {matchReasons.map((reason, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-bg-dark text-brand-red text-xs rounded-full border border-brand-red"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-text-secondary mb-2">
                      SPECIALTIES:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {agency.specialties.slice(0, 4).map(specialty => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-bg-dark text-text-secondary text-xs rounded border border-border-dark"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="md:w-64 shrink-0">
                  <div className="bg-bg-dark rounded-lg p-4 space-y-3 border border-border-dark">
                    <p className="text-xs font-semibold text-text-secondary mb-2">
                      CONTACT OPTIONS:
                    </p>

                    {agency.website && (
                      <a
                        href={agency.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-4 py-2.5 bg-brand-red hover:bg-brand-rose text-text-primary rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    )}

                    {agency.phone && (
                      <a
                        href={`tel:${agency.phone}`}
                        className="flex items-center gap-2 w-full px-4 py-2.5 bg-bg-card-dark hover:bg-bg-dark text-text-primary border border-border-dark rounded-lg text-sm font-semibold transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        {agency.phone}
                      </a>
                    )}

                    {agency.email && (
                      <a
                        href={`mailto:${agency.email}`}
                        className="flex items-center gap-2 w-full px-4 py-2.5 bg-bg-card-dark hover:bg-bg-dark text-text-primary border border-border-dark rounded-lg text-sm font-semibold transition-all"
                      >
                        <Mail className="w-4 h-4" />
                        Send Email
                      </a>
                    )}

                    {agency.emergencyAvailable && (
                      <div className="pt-3 border-t border-border-dark">
                        <p className="text-brand-red text-xs font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          24/7 Available
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Help */}
      <div className="bg-bg-card-dark border border-border-dark rounded-lg p-6 text-center">
        <h3 className="font-semibold text-text-primary mb-2">Need More Options?</h3>
        <p className="text-text-secondary text-sm mb-4">
          Browse our complete directory of fraud reporting agencies worldwide
        </p>
        <button
          onClick={() => window.location.href = '/infosearch'}
          className="px-6 py-2 bg-bg-dark hover:bg-bg-card-dark text-text-primary border border-border-dark rounded-lg font-semibold transition-colors"
        >
          Browse All Agencies
        </button>
      </div>

    </div>
  );
}
