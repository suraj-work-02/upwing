import type { Metadata } from "next";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  const pillars = [
    {
      ...about.mission,
      pill: "Mission",
      bg: "#f7c9c2",
    },
    {
      ...about.vision,
      pill: "Vision",
      bg: "#f9dfae",
    },
    {
      ...about.approach,
      pill: "Approach",
      bg: "#dcd6f7",
    },
  ];

  const timelineColors = [
    "#f7c9c2",
    "#f9dfae",
    "#dcd6f7",
    "#c9e9d3",
    "#f7c9c2",
    "#f9dfae",
  ];

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow={`About ${site.name}`}
        title={about.headline}
        description={about.intro}
      />

      {/* 1. Mission, Vision, Approach Section */}
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
              Core Pillars
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
              How we approach talent, companies, and outcomes
            </h2>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {pillars.map((item, i) => (
              <FadeIn key={item.title} delay={i * 120}>
                <div
                  className="uw-svc uw-glossy"
                  style={{
                    background: item.bg,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 24,
                    padding: 32,
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
                      }}
                    >
                      ● {item.pill}
                    </span>
                    <h3
                      style={{
                        margin: "0 0 12px",
                        fontSize: 24,
                        fontWeight: 800,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        opacity: 0.8,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      opacity: 0.6,
                      marginTop: 24,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    UpWing Foundational Pillar
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Values Section */}
      <section style={{ padding: "100px 28px" }}>
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
              Our Values
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
              What we stand for every day
            </h2>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {about.values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 80}>
                <div
                  className="uw-neu animate-fade-up"
                  style={{
                    borderRadius: 20,
                    padding: 24,
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "#ff6b57",
                      color: "#1c1c1c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 13,
                      marginBottom: 14,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      margin: "0 0 6px",
                      color: "var(--text)",
                    }}
                  >
                    {value.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 14,
                      opacity: 0.65,
                      margin: 0,
                      lineHeight: 1.55,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Timeline / Journey Section */}
      <section style={{ padding: "100px 28px" }}>
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
              Our Journey
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
              Built over a decade of continuous growth
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {about.timeline.map((item, i) => (
                <div
                  key={item.year}
                  className="uw-step animate-fade-up"
                  style={{
                    background: timelineColors[i % timelineColors.length],
                    borderRadius: 20,
                    padding: 24,
                    color: "#1c1c1c",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      color: "#ff6b57",
                      marginBottom: 8,
                      display: "inline-block",
                      background: "#fff",
                      padding: "4px 12px",
                      borderRadius: 100,
                    }}
                  >
                    {item.year}
                  </div>
                  <h4
                    style={{
                      margin: "8px 0 6px",
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      opacity: 0.75,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. Why UpWing Section */}
      <section style={{ padding: "100px 28px" }}>
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
              Why UpWing
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 34px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                maxWidth: 560,
                margin: "0 0 34px",
              }}
            >
              Results that show up on paper, not talking points
            </h2>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {about.why.map((reason, i) => (
              <FadeIn key={reason.title} delay={i * 100}>
                <div
                  className="uw-neu animate-fade-up"
                  style={{
                    borderRadius: 20,
                    padding: 22,
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "#ff6b57",
                      color: "#1c1c1c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 13,
                      marginBottom: 14,
                    }}
                  >
                    ★
                  </div>
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      margin: "0 0 6px",
                      color: "var(--text)",
                    }}
                  >
                    {reason.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      opacity: 0.65,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {reason.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Band */}
      <CtaBand />
    </>
  );
}
