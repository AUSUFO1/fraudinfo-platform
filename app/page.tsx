import Hero from "@/components/sections/Hero";
import StatsCards from "@/components/sections/StatsCards";
import FraudResourcesSection from "@/components/sections/FraudResourcesSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsCards />
      <FraudResourcesSection />
    </main>
  );
}