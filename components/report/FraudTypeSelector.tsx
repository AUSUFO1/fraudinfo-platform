"use client";

import React from 'react';
import { FRAUD_TYPES } from '@/lib/fraud-types';
import * as Icons from 'lucide-react';
import { ChevronRight, AlertTriangle } from 'lucide-react';

interface FraudTypeSelectorProps {
  selectedType?: string;
  onSelect: (fraudTypeId: string) => void;
}

export default function FraudTypeSelector({ selectedType, onSelect }: FraudTypeSelectorProps) {

  // ✅ Fix: Map string icon name -> Lucide component
  const getIcon = (name: string) => {
    const Icon = (Icons as any)[name] as Icons.LucideIcon;
    return Icon ? <Icon className="w-6 h-6 text-brand-red" /> : null;
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {FRAUD_TYPES.map((fraudType) => {
          const isSelected = selectedType === fraudType.id;

          return (
            <button
              key={fraudType.id}
              onClick={() => onSelect(fraudType.id)}
              className={`
                text-left p-4 rounded-xl border transition-all
                flex flex-col gap-2
                ${isSelected
                  ? 'bg-bg-card-dark border-brand-red'
                  : 'bg-bg-card-dark border-border-dark hover:border-brand-red'
                }
              `}
            >
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  {getIcon(fraudType.icon)}

                  {/* ✅ One-line title */}
                  <h3 className={`
                    font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis
                    ${isSelected ? 'text-brand-red' : 'text-text-primary'}
                  `}>
                    {fraudType.name}
                  </h3>
                </div>

                {/* ✅ Urgency – simplified to themed colors only */}
                <span className="
                  text-[10px] font-bold
                  px-2 py-1 rounded-full
                  border border-brand-red text-brand-red
                ">
                  {fraudType.urgency.toUpperCase()}
                </span>
              </div>

              {/* ✅ One-line description */}
              <p className="text-xs text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
                {fraudType.description}
              </p>

              {/* ✅ Examples – show only ONE, single line */}
              {fraudType.examples.slice(0, 1).map((example, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-brand-red shrink-0" />
                  <span className="text-[11px] text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
                    {example}
                  </span>
                </div>
              ))}

              {/* Selected State */}
              {isSelected && (
                <div className="flex items-center gap-2 pt-2 border-t border-border-dark">
                  <AlertTriangle className="w-4 h-4 text-brand-red" />
                  <span className="text-xs text-brand-red font-semibold">
                    Selected
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
