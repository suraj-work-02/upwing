"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drop-in replacement for the old IntersectionObserver FadeIn.
 * Uses GSAP ScrollTrigger for buttery-smooth, scrub-ready reveals.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const axisMap = {
      up: { y: 32, x: 0 },
      down: { y: -32, x: 0 },
      left: { x: 32, y: 0 },
      right: { x: -32, y: 0 },
      none: { x: 0, y: 0 },
    };

    const from = axisMap[direction];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, ...from },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
