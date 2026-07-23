import { Button } from "@/components/ui/Button";

export function PageHero({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta?: { href: string; label: string };
}) {
  return (
    <section className="page-hero-section" style={{ padding: "140px 28px 60px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 12px",
        }}
      >
        <div
          className="uw-pill uw-glass animate-fade-in"
          style={{
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 700,
            color: "#ff6b57",
            marginBottom: 16,
            display: "inline-flex",
          }}
        >
          ● {eyebrow}
        </div>

        <h1
          className="animate-fade-up"
          style={{
            fontSize: "clamp(38px, 5.2vw, 66px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            margin: "0 0 20px",
            maxWidth: 780,
            animationDelay: "100ms",
          }}
        >
          {title}
        </h1>

        <p
          className="animate-fade-up"
          style={{
            fontSize: 18,
            opacity: 0.72,
            maxWidth: 640,
            lineHeight: 1.65,
            animationDelay: "200ms",
          }}
        >
          {description}
        </p>

        {cta ? (
          <div
            className="animate-fade-up"
            style={{ marginTop: 36, animationDelay: "300ms" }}
          >
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
