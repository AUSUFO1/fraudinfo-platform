// app/prevention/page.tsx
import PreventionHero from "@/components/prevention/PreventionHero";
import PreventionPillars from "@/components/prevention/PreventionPillars";
import PreventionDetailedSection from "@/components/prevention/PreventionDetailedSection";
import PreventionScenarioCards from "@/components/prevention/PreventionScenarioCards";
import PreventionTopTips from "@/components/prevention/PreventionTopTips";
import PreventionResources from "@/components/prevention/PreventionResources";

export default function PreventionPage() {
  return (
    <div className="bg-bg-dark text-text-primary">
      <PreventionHero />
      <PreventionPillars />
      <PreventionDetailedSection />
      <PreventionScenarioCards />
      <PreventionTopTips />
      <PreventionResources />
    </div>
  );
}
