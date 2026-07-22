import { FadeIn } from "@/components/motion/FadeIn";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail & E-commerce",
  "Manufacturing",
  "Professional Services",
  "Logistics",
  "Energy",
];

export function IndustriesStrip() {
  return (
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
            Generalist Reach
          </div>
          <h2
            style={{
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 560,
              margin: "0 0 24px",
            }}
          >
            Industries we place into every day
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {industries.map((industry) => (
              <div
                key={industry}
                style={{
                  borderRadius: 100,
                  padding: "12px 22px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--text)",
                  background: "rgba(255, 255, 255, 0.07)",
                  border: "1.5px solid rgba(255, 255, 255, 0.14)",
                  letterSpacing: "0.01em",
                  backdropFilter: "blur(8px)",
                  transition: "background 0.2s, border-color 0.2s",
                  cursor: "default",
                }}
              >
                {industry}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
