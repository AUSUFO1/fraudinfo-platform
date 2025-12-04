import AboutSection from "@/components/About/AboutSection";
import VerificationGrid from "@/components/About/VerificationGrid";
import ContributeForm from "@/components/forms/ContributeForm";

export default function AboutPage() {
  return (
    <main className="pt-10">
      <AboutSection />
      <VerificationGrid />
      <ContributeForm />
    </main>
  );
}
