import { FadeIn } from "@/components/motion/FadeIn";

export function FeatureList({
  features,
}: {
  features: ReadonlyArray<{ title: string; description: string }>;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {features.map((feature, index) => (
        <FadeIn key={feature.title} delay={index * 80}>
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
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                margin: "0 0 6px",
                color: "var(--text)",
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: 14,
                opacity: 0.65,
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {feature.description}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
