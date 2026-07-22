import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhySection } from "@/components/home/WhySection";
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <HowItWorks />
      <WhySection />
      <ReviewsMarquee />
      <CtaBand />
    </>
  );
}
