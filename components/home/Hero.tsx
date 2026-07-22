"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SpecialtyScroll } from "@/components/home/SpecialtyScroll";

export function Hero() {
  const pillRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [pillRef.current, h1Ref.current, paraRef.current, ctaRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.1,
        },
      );

      gsap.fromTo(
        charRef.current,
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.25,
        },
      );

      // Subtle floating loop on the character
      gsap.to(charRef.current, {
        y: -14,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 1. Main Hero Section */}
      <section
        style={{
          padding: "140px 28px 80px",
          minHeight: "calc(88svh - 80px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 12px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr min(460px, 42%)",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* Left: main content */}
            <div>
              {/* Trust pill */}
              <div
                ref={pillRef}
                className="uw-pill uw-glass"
                style={{
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#ff6b57",
                  marginBottom: 16,
                  display: "inline-flex",
                  opacity: 0,
                }}
              >
                ● Trusted by 500+ companies
              </div>

              {/* H1 */}
              <h1
                ref={h1Ref}
                style={{
                  fontSize: "clamp(38px, 5.2vw, 66px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  margin: "0 0 20px",
                  maxWidth: 680,
                  opacity: 0,
                }}
              >
                Grow your team.
                <br />
                Land your dream job.
              </h1>

              {/* Subtext */}
              <p
                ref={paraRef}
                style={{
                  fontSize: 18,
                  opacity: 0,
                  maxWidth: 540,
                  marginBottom: 36,
                  lineHeight: 1.65,
                }}
              >
                UpWing pairs growing companies with the talent they need and
                gives ambitious professionals a real shot at their next role,
                one focused team, two outcomes.
              </p>

              {/* CTA buttons */}
              <div
                ref={ctaRef}
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  opacity: 0,
                }}
              >
                <Link
                  href="/services/career-development"
                  className="uw-pill uw-btn-coral"
                  style={{
                    padding: "14px 26px",
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  For Job Seekers →
                </Link>
                <Link
                  href="/services/recruitment"
                  className="uw-pill uw-glass"
                  style={{
                    padding: "14px 26px",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  For Companies
                </Link>
              </div>
            </div>

            {/* Right: character illustration */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <img
                ref={charRef}
                src="/assets/upwing-character-base-cutout.png"
                alt="UpWing Character"
                style={{
                  width: "100%",
                  maxWidth: 440,
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.18))",
                  opacity: 0,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Specialty Section - GSAP scroll-driven */}
      <SpecialtyScroll />
    </>
  );
}
