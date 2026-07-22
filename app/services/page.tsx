import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { FadeIn } from "@/components/motion/FadeIn";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Check } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Recruitment and career development services for companies and professionals.",
};

const serviceColors: Record<string, string> = {
  recruitment: "#f9dfae",
  "career-development": "#dcd6f7",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Solutions for both sides of hiring"
        description="Whether you are building a team or building a career, start with the service that matches your goal."
      />

      <section style={{ padding: "80px 28px 100px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {services.map((service, index) => {
              const bg = serviceColors[service.slug] || "#f7c9c2";
              return (
                <FadeIn key={service.slug} delay={index * 120}>
                  <div
                    className="uw-svc uw-glossy"
                    style={{
                      background: bg,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 24,
                      padding: 36,
                      color: "#1c1c1c",
                    }}
                  >
                    <div>
                      <span
                        className="uw-pill"
                        style={{
                          background: "#fff",
                          padding: "6px 14px",
                          fontSize: 12,
                          width: "fit-content",
                          marginBottom: 16,
                          fontWeight: 700,
                        }}
                      >
                        ● {service.audience}
                      </span>

                      <h2
                        style={{
                          margin: "0 0 14px",
                          fontSize: 28,
                          fontWeight: 800,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {service.title}
                      </h2>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          opacity: 0.8,
                          lineHeight: 1.6,
                        }}
                      >
                        {service.description}
                      </p>

                      <ul
                        className="uw-svc"
                        style={{ padding: 0, gap: 12, marginTop: 28 }}
                      >
                        {service.highlights.map((item) => (
                          <li
                            key={item}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              fontSize: 15,
                              fontWeight: 600,
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                width: 22,
                                height: 22,
                                borderRadius: 100,
                                background: "rgba(0,0,0,0.1)",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <Check size={12} strokeWidth={2.5} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginTop: 36 }}>
                      <Link
                        href={service.href}
                        className="uw-pill uw-btn-steel"
                        style={{
                          padding: "12px 22px",
                          fontSize: 14,
                          fontWeight: 800,
                          display: "inline-block",
                        }}
                      >
                        {service.cta} →
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
