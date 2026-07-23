"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "Client engagements" },
  { value: 1200, suffix: "+", label: "Professionals placed" },
  { value: 5000, suffix: "+", label: "Candidates coached" },
  { value: 24, suffix: "/7", label: "Dedicated support" },
];

const whyItems = [
  {
    num: "01",
    title: "Proven Track Record",
    desc: "500+ engagements with documented, measurable outcomes.",
  },
  {
    num: "02",
    title: "Generalist Reach",
    desc: "Dedicated coverage across tech, finance, healthcare and beyond.",
  },
  {
    num: "03",
    title: "Built for Your Situation",
    desc: "No off-the-shelf playbook - every engagement starts with your goals.",
  },
  {
    num: "04",
    title: "We Stay Until It's Done",
    desc: "From strategy to placement, we're involved until the outcome is real.",
  },
];

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  // Individual counter elements
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        },
      );

      // Stat counters - animate from 0 to target value
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = stats[i];
        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + stat.suffix;
          },
        });
      });

      // Stat section fade in
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
        },
      );

      // Why cards stagger
      const cards = cardsRef.current?.querySelectorAll(".why-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 82%" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="why-section" style={{ padding: "100px 28px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0, marginBottom: 48 }}>
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
              margin: 0,
            }}
          >
            Results that show up on paper, not talking points
          </h2>
        </div>

        {/* Animated stat counters */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 20,
            marginBottom: 48,
            opacity: 0,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="uw-glossy"
              style={{
                borderRadius: 20,
                padding: "24px 20px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#ff6b57",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <span
                  ref={(el) => {
                    counterRefs.current[i] = el;
                  }}
                >
                  0{stat.suffix}
                </span>
              </div>
              <div style={{ fontSize: 13, opacity: 0.55, fontWeight: 600 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Why cards */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {whyItems.map((item) => (
            <div
              key={item.num}
              className="why-card uw-neu"
              style={{
                borderRadius: 20,
                padding: 22,
                height: "100%",
                opacity: 0,
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
                {item.num}
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px" }}>
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: 13,
                  opacity: 0.65,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
