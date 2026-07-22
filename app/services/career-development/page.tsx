import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/content/services";
import { FeatureList } from "@/components/services/FeatureList";
import { ServiceHero } from "@/components/services/ServiceHero";
import { FadeIn } from "@/components/motion/FadeIn";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Career Development Services",
  description:
    "Coaching and placement support to help professionals land roles with a clear plan.",
};

const outcomeColors = ["#f7c9c2", "#f9dfae", "#dcd6f7"];

export default function CareerDevelopmentPage() {
  const service = getService("career-development");
  if (!service) notFound();

  return (
    <>
      <ServiceHero
        audience={service.audience}
        title={service.title}
        description={service.description}
        cta="Start your journey"
        ctaHref="/contact"
      />

      <section style={{ padding: "80px 28px 100px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
          <FadeIn>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#ff6b57",
                marginBottom: 6,
              }}
            >
              What&apos;s included
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 34px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                maxWidth: 640,
                margin: "0 0 34px",
              }}
            >
              A career path with coaching and real placement support
            </h2>
          </FadeIn>

          <FeatureList features={service.features} />
        </div>
      </section>

      <section style={{ padding: "80px 28px 100px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
          <FadeIn>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#ff6b57",
                marginBottom: 6,
              }}
            >
              Outcomes
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 34px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                maxWidth: 600,
                margin: "0 0 34px",
              }}
            >
              Proven career advancement you can measure
            </h2>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {service.outcomes.map((outcome, index) => (
              <FadeIn key={outcome.label} delay={index * 100}>
                <div
                  className="uw-step animate-fade-up"
                  style={{
                    background: outcomeColors[index % outcomeColors.length],
                    borderRadius: 20,
                    padding: 32,
                    textAlign: "center",
                    color: "#1c1c1c",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(36px, 4vw, 52px)",
                      fontWeight: 800,
                      margin: 0,
                      letterSpacing: "-0.03em",
                      color: "#1c1c1c",
                    }}
                  >
                    {outcome.value}
                  </p>
                  <p
                    style={{
                      marginTop: 12,
                      fontSize: 15,
                      fontWeight: 700,
                      opacity: 0.85,
                      marginBottom: 0,
                    }}
                  >
                    {outcome.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
