"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    bg: "#f7c9c2",
    pill: "Staffing",
    title: "Staffing Solutions",
    description:
      "Flexible workforce models structured around your timeline and internal capacity.",
    items: [
      "Contract staffing",
      "Contract-to-hire",
      "Staff augmentation",
      "Payroll & compliance handled",
    ],
    cta: "Explore Staffing →",
    href: "/services/recruitment",
    img: "/assets/staffing.png",
  },
  {
    bg: "#f9dfae",
    pill: "Recruitment",
    title: "Recruitment & Talent Acquisition",
    description:
      "End-to-end sourcing that moves faster than traditional hiring, without cutting corners.",
    items: [
      "Market mapping",
      "Candidate database management",
      "Hiring process automation",
      "Dedicated recruiter pods",
    ],
    cta: "Explore Recruitment →",
    href: "/services/recruitment",
    img: "/assets/recruitment.png",
  },
  {
    bg: "#dcd6f7",
    pill: "Career",
    title: "Career Coaching & Development",
    description:
      "Direct, hands-on coaching that gets you from application to offer.",
    items: [
      "1:1 career coaching",
      "Resume & portfolio review",
      "Interview preparation",
      "Hands-on placement support",
    ],
    cta: "Explore Career Coaching →",
    href: "/services/career-development",
    img: "/assets/career.png",
  },
];

// Visual position of a card given its rank in the stack (0 = front).
const PEEK_Y = 24; // how much each card behind peeks upward
const STEP_SCALE = 0.05; // how much each card behind shrinks

function slot(rank: number) {
  return {
    y: -rank * PEEK_Y,
    scale: 1 - rank * STEP_SCALE,
    opacity: rank <= 2 ? 1 - rank * 0.12 : 0,
    zIndex: services.length - rank,
  };
}

function StackCard({ svc }: { svc: (typeof services)[0] }) {
  return (
    <div
      className="uw-svc uw-glossy specialty-stack-card"
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "100%",
        height: "100%",
        maxWidth: 920,
        transformOrigin: "top center",
        background: svc.bg,
        boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
        willChange: "transform, opacity",
      }}
    >
      <div className="svc-stack-grid">
        <div
          className="svc-stack-image"
          style={{
            borderRadius: 18,
            overflow: "hidden",
            background: "transparent",
            aspectRatio: "4 / 3",
            position: "relative",
          }}
        >
          <img
            src={svc.img}
            alt={svc.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "bottom center",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span
            className="uw-pill"
            style={{
              background: "#fff",
              padding: "6px 14px",
              fontSize: 12,
              width: "fit-content",
            }}
          >
            {svc.pill}
          </span>

          <h3
            style={{
              margin: 0,
              fontSize: "clamp(22px, 2.4vw, 30px)",
              fontWeight: 800,
            }}
          >
            {svc.title}
          </h3>

          <p style={{ margin: 0, fontSize: 15, opacity: 0.75, lineHeight: 1.6 }}>
            {svc.description}
          </p>

          <ul style={{ padding: 0, margin: 0, gap: 9 }}>
            {svc.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Link
            href={svc.href}
            className="uw-pill uw-btn-steel"
            style={{
              padding: "10px 18px",
              fontSize: 13,
              width: "fit-content",
              marginTop: 6,
            }}
          >
            {svc.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesPreview() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLDivElement>(
        ".specialty-stack-card",
      );
      const n = cardEls.length;

      // Initial stacked state: card i starts at rank i.
      // yPercent:-50 keeps every card vertically centered in the deck; the
      // per-rank peek offset is applied on top via `y`.
      cardEls.forEach((el, i) => {
        gsap.set(el, {
          ...slot(i),
          yPercent: -50,
          transformOrigin: "top center",
        });
      });

      // `order[0]` is the index of the card currently at the front.
      const order = cardEls.map((_, i) => i);

      const totalScrollHeight = () => n * window.innerHeight * 0.85;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${totalScrollHeight()}`,
          pin: sticky,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 1,
          snap: {
            snapTo: "labels",
            duration: { min: 0.25, max: 0.6 },
            delay: 0,
            ease: "power1.inOut",
          },
        },
      });

      tl.addLabel("step-0");
      tl.to({}, { duration: 1 });

      // Each step swipes the front card off to the right (clear / Tinder-style)
      // and brings the next card forward. n-1 steps reveals every card once.
      for (let step = 0; step < n - 1; step++) {
        const frontIdx = order.shift() as number;

        // Front card swipes off to the right and disappears.
        tl.to(cardEls[frontIdx], {
          x: "140%",
          rotation: 18,
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.inOut",
          onStart: () => {
            gsap.set(cardEls[frontIdx], {
              zIndex: services.length + 1,
              pointerEvents: "none",
            });
          },
          onReverseComplete: () => {
            gsap.set(cardEls[frontIdx], {
              zIndex: slot(0).zIndex,
              pointerEvents: "auto",
            });
            gsap.set(cardEls[frontIdx], { x: 0, rotation: 0, ...slot(0) });
          },
        });

        // Remaining cards shift forward one rank.
        order.forEach((cardIdx, rank) => {
          const target = slot(rank);
          tl.to(
            cardEls[cardIdx],
            {
              y: target.y,
              scale: target.scale,
              opacity: target.opacity,
              zIndex: target.zIndex,
              duration: 0.6,
              ease: "power2.inOut",
            },
            "<",
          );
        });

        tl.addLabel(`step-${step + 1}`);
        tl.to({}, { duration: 1 });
      }
    }, outer);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative", overflow: "hidden" }}>
      <div
        ref={stickyRef}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          clipPath: "inset(0)",
        }}
      >
        <div
          className="services-stack-header"
          style={{
            padding: "56px 40px 0",
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#ff6b57",
              marginBottom: 6,
            }}
          >
            What We Do
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 600,
              margin: 0,
            }}
          >
            Three ways we move people and businesses forward
          </h2>
        </div>

        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 28px",
          }}
        >
          <div
            className="services-stack-container"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 920,
              height: "min(70vh, 520px)",
            }}
          >
            {services.map((svc) => (
              <StackCard key={svc.pill} svc={svc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
