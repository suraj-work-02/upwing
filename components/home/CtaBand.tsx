import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

export function CtaBand() {
  return (
    <section style={{ padding: "60px 28px 80px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
        <FadeIn>
          <div
            style={{
              background: "linear-gradient(180deg, #000, #0a0b0d)",
              color: "#fff",
              borderRadius: 28,
              padding: "48px 44px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
              border: "1px solid rgba(255,255,255,.14)",
              boxShadow:
                "0 24px 50px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#fff",
                  margin: "0 0 8px",
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  fontWeight: 800,
                }}
              >
                Ready to see what UpWing can do?
              </h2>
              <p
                style={{
                  opacity: 0.7,
                  margin: 0,
                  maxWidth: 420,
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                Book a free 20-minute call, we&apos;ll show you exactly how it
                applies to your situation, whether you&apos;re hiring or job
                hunting.
              </p>
            </div>
            <Link
              href="/contact"
              className="uw-btn-coral"
              style={{
                color: "#1c1c1c",
                fontWeight: 800,
                padding: "15px 28px",
                borderRadius: 100,
                fontSize: 14,
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              Schedule Free Consultation →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
