"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    category: "Staffing",
    title: "Contract & Contract-to-Hire",
    description:
      "Flexible workforce models structured around your timeline. From short-term contracts to full-time conversions.",
    stat: "1,200+ placed",
    img: "/assets/contract.png",
    href: "/services/recruitment",
  },
  {
    category: "Recruitment",
    title: "Talent Sourcing & Market Mapping",
    description:
      "End-to-end sourcing that moves faster than traditional hiring, without cutting corners on quality.",
    stat: "500+ companies",
    img: "/assets/searching.png",
    href: "/services/recruitment",
  },
  {
    category: "Career Coaching",
    title: "1:1 Coaching & Interview Prep",
    description:
      "Direct, hands-on coaching that takes you from application to offer. Resume reviews, mock interviews, placement support.",
    stat: "5,000+ coached",
    img: "/assets/coaching.png",
    href: "/services/career-development",
  },
];

function CardPanel({
  card,
  index,
}: {
  card: (typeof cards)[0];
  index: number;
}) {
  return (
    <div
      className="specialty-card-panel"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 28px",
        opacity: index === 0 ? 1 : 0,
        pointerEvents: index === 0 ? "auto" : "none",
      }}
    >
      <div
        className="specialty-panel-grid"
        style={{ width: "100%", maxWidth: 1100 }}
      >
        <div
          className="specialty-panel-image"
          style={{
            order: 1,
            borderRadius: 28,
            overflow: "hidden",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            transition: "transform 0.35s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.025)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          <img
            src={card.img}
            alt={card.title}
            className="specialty-char-img"
            style={{
              width: "85%",
              height: "85%",
              objectFit: "contain",
              objectPosition: "bottom center",
            }}
          />
        </div>

        <div
          style={{
            order: 2,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(255,107,87,0.1)",
              border: "1px solid rgba(255,107,87,0.22)",
              color: "#ff6b57",
              borderRadius: 100,
              padding: "6px 16px",
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              width: "fit-content",
            }}
          >
            {card.category}
          </span>

          <h3
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontSize: "clamp(15px, 1.5vw, 18px)",
              opacity: 0.72,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 420,
            }}
          >
            {card.description}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff6b57",
                display: "inline-block",
                flexShrink: 0,
                boxShadow: "0 0 10px rgba(255,107,87,0.6)",
              }}
            />
            {card.stat}
          </div>

          <div style={{ marginTop: 6 }}>
            <Link
              href={card.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                color: "#1c1c1c",
                borderRadius: 100,
                padding: "14px 28px",
                fontWeight: 800,
                fontSize: 14,
                width: "fit-content",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 30px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.12)";
              }}
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpecialtyScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLDivElement>(
        ".specialty-card-panel",
      );

      cardEls.forEach((el, i) => {
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 56,
          scale: i === 0 ? 1 : 0.94,
          pointerEvents: i === 0 ? "auto" : "none",
          zIndex: cards.length - i,
        });

        const charImg = el.querySelector(".specialty-char-img");
        if (charImg) {
          gsap.to(charImg, {
            y: -14,
            duration: 2.6 + i * 0.25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        }
      });

      // One "viewport" worth of scroll distance is allocated per card so that
      // each card requires a full, deliberate scroll to advance.
      const totalScrollHeight = () => cards.length * window.innerHeight;

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
          // Snap to the label of each card so a scroll gesture always settles
          // on exactly one card instead of skipping through several.
          snap: {
            snapTo: "labels",
            duration: { min: 0.25, max: 0.6 },
            delay: 0,
            ease: "power1.inOut",
          },
        },
      });

      // Resting point of the first card.
      tl.addLabel("card-0");
      // Hold so the first card stays fully visible for a beat before advancing.
      tl.to({}, { duration: 1 });

      cardEls.forEach((el, i) => {
        if (i < cardEls.length - 1) {
          const nextEl = cardEls[i + 1];
          tl.to(el, {
            opacity: 0,
            y: -44,
            scale: 0.94,
            duration: 0.6,
            pointerEvents: "none",
            ease: "power2.inOut",
          }).to(
            nextEl,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              pointerEvents: "auto",
              ease: "power2.inOut",
            },
            "-=0.2",
          );

          // Resting point of the card we just transitioned to.
          tl.addLabel(`card-${i + 1}`);
          // Hold so this card stays fully visible before the next transition.
          tl.to({}, { duration: 1 });
        }
      });
    }, outer);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={outerRef} style={{ position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          className="specialty-scroll-header"
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
              fontWeight: 800,
              color: "#ff6b57",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 10,
            }}
          >
            Our Specialty
          </div>
          <h2
            style={{
              fontSize: "clamp(22px, 2.5vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: 560,
            }}
          >
            Three specialized models built for your exact hiring goals
          </h2>
        </div>

        <div style={{ flex: 1, position: "relative" }}>
          {cards.map((card, i) => (
            <CardPanel key={card.category} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
