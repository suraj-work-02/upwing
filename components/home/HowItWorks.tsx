"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: 'We learn your goals, timeline and what "right fit" means for you.',
    bg: "#f7c9c2",
  },
  {
    num: "02",
    title: "Matching",
    desc: "Curated shortlist of roles or candidates within days, not weeks.",
    bg: "#f9dfae",
  },
  {
    num: "03",
    title: "Interviews",
    desc: "We coordinate scheduling, prep and feedback loops end to end.",
    bg: "#dcd6f7",
  },
  {
    num: "04",
    title: "Placement & Support",
    desc: "We stay engaged through onboarding and beyond.",
    bg: "#c9e9d3",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade-up
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Step cards stagger in from below, each with a slight scale bounce
      const stepCards = stepsRef.current?.querySelectorAll(".how-step");
      if (stepCards) {
        gsap.fromTo(
          stepCards,
          { opacity: 0, y: 50, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Connecting line between steps (draws left-to-right via scaleX)
      const line = sectionRef.current?.querySelector(".how-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1, duration: 1.2, ease: "power2.inOut",
            scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "100px 28px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
        <div ref={headingRef} style={{ opacity: 0, marginBottom: 48 }}>
          <div
            style={{
              fontSize: 13, fontWeight: 700, color: "#ff6b57", marginBottom: 6,
            }}
          >
            How It Works
          </div>
          <h2
            style={{
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 560,
              margin: 0,
            }}
          >
            From first call to placement
          </h2>
        </div>

        {/* Steps + connector line */}
        <div style={{ position: "relative" }}>
          {/* Animated connector line */}
          <div
            className="how-line"
            style={{
              position: "absolute",
              top: 28,
              left: "12.5%",
              width: "75%",
              height: 2,
              background:
                "linear-gradient(90deg, #f7c9c2, #f9dfae, #dcd6f7, #c9e9d3)",
              borderRadius: 2,
              zIndex: 0,
            }}
          />

          <div
            ref={stepsRef}
            style={{ display: "flex", gap: 16, flexWrap: "wrap", position: "relative", zIndex: 1 }}
          >
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="how-step uw-step"
                style={{
                  background: step.bg,
                  flex: "1 1 200px",
                  opacity: 0,
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 14,
                    color: "#1c1c1c",
                    marginBottom: 16,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    border: `3px solid ${step.bg}`,
                    outline: "3px solid #1c1c1c22",
                  }}
                >
                  {step.num}
                </div>
                <h4 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800 }}>
                  {step.title}
                </h4>
                <p style={{ margin: 0, fontSize: 13, opacity: 0.7, lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
