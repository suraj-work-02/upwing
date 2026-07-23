"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: 'We learn your goals, timeline and what "right fit" means for you.',
    bg: "#f7c9c2",
    side: "left" as const,
  },
  {
    num: "02",
    title: "Matching",
    desc: "Curated shortlist of roles or candidates within days, not weeks.",
    bg: "#f9dfae",
    side: "right" as const,
  },
  {
    num: "03",
    title: "Interviews",
    desc: "We coordinate scheduling, prep and feedback loops end to end.",
    bg: "#dcd6f7",
    side: "left" as const,
  },
  {
    num: "04",
    title: "Placement & Support",
    desc: "We stay engaged through onboarding and beyond.",
    bg: "#c9e9d3",
    side: "right" as const,
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [svgPath, setSvgPath] = useState("");
  const [svgH, setSvgH] = useState(0);

  // ── Build the S-curve path from real card positions ──────────────────────
  useLayoutEffect(() => {
    function buildPath() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const wRect = wrapper.getBoundingClientRect();
      const wTop = wRect.top + window.scrollY;
      const wLeft = wRect.left;
      const wW = wRect.width;
      const wH = wRect.height;

      // Collect the "entry point" of each card (right-center for left cards,
      // left-center for right cards) — these are the points the path visits.
      const pts = cardRefs.current.map((el, i) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        const cardTop = r.top + window.scrollY - wTop;
        const cardCenterY = cardTop + r.height / 2;
        const isLeft = steps[i].side === "left";
        // x: right edge of left card, left edge of right card
        const x = isLeft
          ? r.left - wLeft + r.width // right edge of left card
          : r.left - wLeft; // left edge of right card
        return { x, y: cardCenterY };
      });

      if (pts.some((p) => p.x === 0 && p.y === 0)) return;

      // Build a smooth S-curve that visits each point:
      // Between consecutive points we use a cubic bezier whose control points
      // pull horizontally outward so the path has nice rounded U-turns.
      let d = `M ${pts[0].x} ${pts[0].y}`;

      for (let i = 0; i < pts.length - 1; i++) {
        const cur = pts[i];
        const next = pts[i + 1];
        const mid = (cur.y + next.y) / 2;
        // Control points: keep x at current & next, bend at mid-y
        const cp1x = cur.x;
        const cp1y = mid;
        const cp2x = next.x;
        const cp2y = mid;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
      }

      setSvgPath(d);
      setSvgH(wH);
    }

    buildPath();
    window.addEventListener("resize", buildPath);
    return () => window.removeEventListener("resize", buildPath);
  }, []);

  // ── GSAP animations (path draw + cards) ──────────────────────────────────
  useLayoutEffect(() => {
    if (!svgPath) return; // wait until path is computed

    const ctx = gsap.context(() => {
      /* 1. Heading */
      gsap.fromTo(
        ".hiw-heading",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".hiw-heading", start: "top 88%" },
        },
      );

      /* 2. Draw S-curve with scroll */
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 72%",
            end: "bottom 52%",
            scrub: 1.2,
          },
        });
      }

      /* 3. Cards fly in one-by-one */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = steps[i].side === "left";
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -60 : 60,
            y: 18,
            scale: 0.9,
            rotation: isLeft ? -4 : 4,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "center 70%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [svgPath]);

  return (
    <section ref={sectionRef} className="hiw-section" style={{ padding: "100px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Heading */}
        <div
          className="hiw-heading"
          style={{ opacity: 0, textAlign: "center", marginBottom: 80 }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#ff6b57",
              marginBottom: 6,
            }}
          >
            How It Works
          </div>
          <h2
            style={{
              fontSize: "clamp(22px, 2.5vw, 32px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            From first call to placement
          </h2>
        </div>

        {/* Cards + live-measured SVG S-curve */}
        <div ref={wrapperRef} style={{ position: "relative" }}>
          {/* SVG uses pixel coordinates — no distortion */}
          {svgPath && (
            <svg
              ref={svgRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: svgH,
                zIndex: 0,
                pointerEvents: "none",
                overflow: "visible",
              }}
            >
              {/* faint track */}
              <path
                d={svgPath}
                stroke="#ff6b57"
                strokeWidth="2"
                strokeOpacity="0.15"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* animated drawn line */}
              <path
                ref={pathRef}
                d={svgPath}
                stroke="#ff6b57"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* Cards */}
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="hiw-row"
              style={{
                display: "flex",
                justifyContent:
                  step.side === "left" ? "flex-start" : "flex-end",
                // large gap so each card enters viewport separately
                paddingBottom: i < steps.length - 1 ? 120 : 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                className="how-step"
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  background: step.bg,
                  width: 320,
                  flex: "0 0 320px",
                  color: "#1c1c1c",
                  opacity: 0,
                  willChange: "transform, opacity",
                  padding: "26px 28px",
                  borderRadius: 22,
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                  position: "relative",
                }}
              >
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
                    fontSize: 13,
                    color: "#1c1c1c",
                    marginBottom: 16,
                    boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
                    border: `2px solid ${step.bg}`,
                    outline: "2px solid #1c1c1c15",
                  }}
                >
                  {step.num}
                </div>
                <h4
                  style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 800 }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    opacity: 0.7,
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
