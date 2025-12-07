"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import PreparationChecklist from '@/components/report/PreparationChecklist';
import FraudTypeSelector from '@/components/report/FraudTypeSelector';
import LocationSelector from '@/components/report/LocationSelector';
import AgencyRecommendations from '@/components/report/AgencyRecommendations';
import { recommendAgencies, AgencyRecommendation } from '@/lib/report-utils';

const ReportFraudPage = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [preparationComplete, setPreparationComplete] = useState(false);
  const [selectedFraudType, setSelectedFraudType] = useState<string | undefined>(undefined);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<AgencyRecommendation[]>([]);

  const steps = [
    { number: 1, title: 'Prepare' },
    { number: 2, title: 'Fraud Type' },
    { number: 3, title: 'Location' },
    { number: 4, title: 'Agencies' }
  ];

  useEffect(() => {
    if (selectedFraudType) {
      const recs = recommendAgencies({
        fraudType: selectedFraudType,
        region: selectedRegion,
        country: selectedCountry
      });
      setRecommendations(recs);
    }
  }, [selectedFraudType, selectedRegion, selectedCountry]);

  const isStepComplete = (stepNum: number): boolean => {
    if (stepNum === 1) return preparationComplete;
    if (stepNum === 2) return selectedFraudType !== undefined;
    if (stepNum === 3) return selectedRegion !== undefined;
    return false;
  };

  return (
    <div className="min-h-screen bg-bg-dark py-12">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Report Fraud
          </h1>
          <p className="text-lg text-text-secondary">
            We'll guide you through reporting your case to the right authorities
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all border
                      ${currentStep === step.number
                        ? 'bg-brand-red text-text-primary border-brand-red'
                        : currentStep > step.number || isStepComplete(step.number)
                        ? 'bg-bg-card-dark text-text-primary border-brand-red'
                        : 'bg-bg-card-dark text-text-secondary border-border-dark'
                      }
                    `}
                  >
                    {isStepComplete(step.number) && currentStep !== step.number
                      ? <CheckCircle className="w-6 h-6" />
                      : step.number
                    }
                  </div>

                  <span
                    className={`
                      mt-2 text-sm font-medium
                      ${currentStep === step.number
                        ? 'text-brand-red'
                        : 'text-text-secondary'
                      }
                    `}
                  >
                    {step.title}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-0.5 mx-4 transition-all
                      ${currentStep > step.number
                        ? 'bg-brand-red'
                        : 'bg-border-dark'
                      }
                    `}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-bg-card-dark border border-border-dark rounded-2xl p-8 mb-10">

          {/* Step 1 */}
          {currentStep === 1 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  Step 1: Prepare Your Report
                </h2>
                <p className="text-text-secondary">
                  Before reporting, make sure you have all necessary information ready.
                </p>
              </div>
              <PreparationChecklist
                onComplete={() => {
                  setPreparationComplete(true);
                  setCurrentStep(2);
                }}
              />
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  Step 2: Select Fraud Type
                </h2>
                <p className="text-text-secondary">
                  Choose the type of fraud you experienced.
                </p>
              </div>
              <FraudTypeSelector
                selectedType={selectedFraudType}
                onSelect={setSelectedFraudType}
              />
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  Step 3: Select Location
                </h2>
                <p className="text-text-secondary">
                  Help us recommend the right authorities (optional but recommended).
                </p>
              </div>
              <LocationSelector
                selectedRegion={selectedRegion}
                selectedCountry={selectedCountry}
                onRegionSelect={(r) => {
                  setSelectedRegion(r);
                  setSelectedCountry(undefined);
                }}
                onCountrySelect={setSelectedCountry}
              />
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  Step 4: Recommended Agencies
                </h2>
                <p className="text-text-secondary">
                  Based on your information, here are the agencies you should contact.
                </p>
              </div>
              <AgencyRecommendations
                recommendations={recommendations}
                fraudTypeId={selectedFraudType}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            disabled={currentStep === 1}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all border
              ${currentStep === 1
                ? 'bg-bg-card-dark text-text-secondary border-border-dark cursor-not-allowed'
                : 'bg-bg-dark text-text-primary border-border-dark hover:bg-bg-card-dark'
              }
            `}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Continue / Complete */}
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}
              disabled={
                (currentStep === 1 && !preparationComplete) ||
                (currentStep === 2 && !selectedFraudType)
              }
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${(currentStep === 1 && !preparationComplete) ||
                  (currentStep === 2 && !selectedFraudType)
                  ? 'bg-bg-card-dark text-text-secondary cursor-not-allowed'
                  : 'bg-brand-red text-text-primary hover:bg-brand-rose'
                }
              `}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-brand-red text-text-primary hover:bg-brand-rose transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              Complete Report
            </button>
          )}
        </div>

        {/* Alerts */}
        {(currentStep === 1 && !preparationComplete) && (
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-bg-card-dark border border-brand-red rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-brand-red mt-0.5 shrink-0" />
              <div className="text-sm text-text-primary">
                <strong>Complete all required items</strong> before proceeding to the next step.
              </div>
            </div>
          </div>
        )}

        {(currentStep === 2 && !selectedFraudType) && (
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-bg-card-dark border border-brand-red rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-brand-red mt-0.5 shrink-0" />
              <div className="text-sm text-text-primary">
                <strong>Select a fraud type</strong> to continue to the next step.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ReportFraudPage;
