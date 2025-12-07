"use client";

import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { PREPARATION_CHECKLIST } from '@/lib/fraud-types';

interface PreparationChecklistProps {
  onComplete: () => void;
}

export default function PreparationChecklist({ onComplete }: PreparationChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const requiredItems = PREPARATION_CHECKLIST.filter(item => item.required);
  const allRequiredChecked = requiredItems.every(item => checkedItems.has(item.id));
  const progress = (checkedItems.size / PREPARATION_CHECKLIST.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Before You Report
        </h2>
        <p className="text-text-secondary text-lg">
          Prepare your information to make an effective report
        </p>
      </div>

      {/* Alert Banner */}
      <div className="bg-bg-card-dark border border-brand-red rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
        <div>
          <p className="text-text-primary font-semibold mb-1">Important</p>
          <p className="text-text-secondary text-sm">
            Having complete documentation increases the chances of successful investigation and recovery.
            Items marked with * are required.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-text-secondary">Progress</span>
          <span className="text-brand-red font-semibold">
            {checkedItems.size} / {PREPARATION_CHECKLIST.length} completed
          </span>
        </div>

        <div className="w-full bg-bg-dark rounded-full h-2 overflow-hidden border border-border-dark">
          <div
            className="bg-brand-red h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3 mb-8">
        {PREPARATION_CHECKLIST.map(item => {
          const isChecked = checkedItems.has(item.id);

          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`
                w-full text-left p-4 rounded-lg border transition-all duration-200
                ${isChecked
                  ? 'bg-bg-card-dark border-brand-red'
                  : 'bg-bg-card-dark border-border-dark hover:border-brand-red'
                }
              `}
            >
              <div className="flex items-start gap-4">

                {/* Icon + Checkbox */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xl text-text-primary">
                    {item.icon}
                  </span>

                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-red" />
                  ) : (
                    <Circle className="w-5 h-5 text-text-secondary" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-text-primary">
                      {item.title}
                    </h3>
                    {item.required && (
                      <span className="text-brand-red text-[10px]">*</span>
                    )}
                  </div>

                  <p className="text-xs text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onComplete}
          disabled={!allRequiredChecked}
          className={`
            px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300
            ${allRequiredChecked
              ? 'bg-brand-red hover:bg-brand-rose text-text-primary'
              : 'bg-bg-card-dark text-text-secondary border border-border-dark cursor-not-allowed'
            }
          `}
        >
          {allRequiredChecked
            ? 'Continue to Report Fraud'
            : 'Complete Required Items to Continue'
          }
        </button>

        {!allRequiredChecked && (
          <p className="text-sm text-text-secondary text-center">
            Please check all required items (*) before continuing
          </p>
        )}
      </div>

    </div>
  );
}
