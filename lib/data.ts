import { Agency, FraudTip, AgencyCategory, FraudCategory } from "@/types";
import agenciesData from "@/data/agencies.json";
import tipsData from "@/data/fraud-tips.json";

// Get all agencies
export function getAllAgencies(): Agency[] {
  return agenciesData as Agency[];
}

// Get agencies by category
export function getAgenciesByCategory(category: AgencyCategory): Agency[] {
  return agenciesData.filter((agency) => agency.category === category) as Agency[];
}

// Get agencies by country
export function getAgenciesByCountry(country: string): Agency[] {
  return agenciesData.filter(
    (agency) => agency.country.toLowerCase() === country.toLowerCase()
  ) as Agency[];
}

// Get agencies by region
export function getAgenciesByRegion(region: string): Agency[] {
  return agenciesData.filter(
    (agency) => agency.region.toLowerCase() === region.toLowerCase()
  ) as Agency[];
}

// Search agencies by name or description
export function searchAgencies(query: string): Agency[] {
  const lowercaseQuery = query.toLowerCase();
  return agenciesData.filter(
    (agency) =>
      agency.name.toLowerCase().includes(lowercaseQuery) ||
      agency.description.toLowerCase().includes(lowercaseQuery) ||
      agency.country.toLowerCase().includes(lowercaseQuery)
  ) as Agency[];
}

// Get single agency by ID
export function getAgencyById(id: string): Agency | undefined {
  return agenciesData.find((agency) => agency.id === id) as Agency | undefined;
}

// Get all fraud tips
export function getAllFraudTips(): FraudTip[] {
  return tipsData as FraudTip[];
}

// Get fraud tips by category
export function getFraudTipsByCategory(category: FraudCategory): FraudTip[] {
  return tipsData.filter((tip) => tip.category === category) as FraudTip[];
}

// Get fraud tips by severity
export function getFraudTipsBySeverity(
  severity: "low" | "medium" | "high" | "critical"
): FraudTip[] {
  return tipsData.filter((tip) => tip.severity === severity) as FraudTip[];
}

// Search fraud tips
export function searchFraudTips(query: string): FraudTip[] {
  const lowercaseQuery = query.toLowerCase();
  return tipsData.filter(
    (tip) =>
      tip.title.toLowerCase().includes(lowercaseQuery) ||
      tip.description.toLowerCase().includes(lowercaseQuery) ||
      tip.category.toLowerCase().includes(lowercaseQuery)
  ) as FraudTip[];
}

// Get unique countries from agencies
export function getUniqueCountries(): string[] {
  const countries = agenciesData.map((agency) => agency.country);
  return Array.from(new Set(countries)).sort();
}

// Get unique regions from agencies
export function getUniqueRegions(): string[] {
  const regions = agenciesData.map((agency) => agency.region);
  return Array.from(new Set(regions)).sort();
}

// Get unique categories from agencies
export function getUniqueAgencyCategories(): AgencyCategory[] {
  const categories = agenciesData.map((agency) => agency.category);
  return Array.from(new Set(categories)) as AgencyCategory[];
}