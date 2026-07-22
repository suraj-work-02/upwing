"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileNav } from "@/components/layout/MobileNav";
import { ChevronDown } from "@/components/ui/Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinksRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [pillVisible, setPillVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const movePillTo = useCallback((el: HTMLAnchorElement) => {
    const container = navLinksRef.current;
    const pill = pillRef.current;
    if (!container || !pill) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    pill.style.width = `${elRect.width}px`;
    pill.style.transform = `translateX(${elRect.left - containerRect.left}px)`;
  }, []);

  const snapToActive = useCallback(() => {
    const activeHref = site.nav.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    )?.href;
    const el = activeHref ? linkRefs.current.get(activeHref) : null;
    if (el) movePillTo(el);
  }, [pathname, movePillTo]);

  useEffect(() => {
    const frame = requestAnimationFrame(snapToActive);
    return () => cancelAnimationFrame(frame);
  }, [snapToActive]);

  useEffect(() => {
    window.addEventListener("resize", snapToActive, { passive: true });
    return () => window.removeEventListener("resize", snapToActive);
  }, [snapToActive]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* ── Desktop ── */}
        <div
          className={cn(
            "hidden md:flex mx-auto items-center justify-between transition-all duration-500 ease-in-out",
            scrolled
              ? "max-w-[1400px] mt-4 mx-6 xl:mx-auto xl:max-w-[1400px] px-0 rounded-[980px]"
              : "max-w-[1400px] px-10 mt-0 rounded-none",
          )}
          style={{
            background: scrolled ? "rgba(22, 22, 24, 0.55)" : "transparent",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid transparent",
            padding: scrolled ? "8px 8px 8px 24px" : "22px 0",
            backdropFilter: scrolled ? "blur(24px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
            boxShadow: scrolled
              ? "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)"
              : "none",
            borderRadius: scrolled ? 980 : 0,
            transition:
              "background 0.5s ease, border 0.5s ease, padding 0.5s ease, border-radius 0.5s ease, box-shadow 0.5s ease, backdrop-filter 0.5s ease",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.02em",
              color: "#eeece5",
              whiteSpace: "nowrap",
            }}
            onClick={() => setOpen(false)}
          >
            Up<span style={{ color: "#ff6b57" }}>Wing</span>
          </Link>

          {/* Nav links */}
          <div
            ref={navLinksRef}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
            onMouseLeave={() => {
              setPillVisible(false);
              snapToActive();
            }}
          >
            {/* Sliding hover pill - only visible when scrolled */}
            <div
              ref={pillRef}
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                borderRadius: 980,
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.10)",
                transition: pillVisible
                  ? "transform 0.26s cubic-bezier(0.25,1,0.5,1), width 0.26s cubic-bezier(0.25,1,0.5,1), opacity 0.15s ease"
                  : "opacity 0.2s ease",
                pointerEvents: "none",
                willChange: "transform, width",
                opacity: pillVisible && scrolled ? 1 : 0,
                width: 0,
              }}
            />

            {site.nav.map((item) => {
              const active = isActive(item.href);
              const hasChildren =
                "children" in item && Boolean(item.children?.length);

              if (hasChildren) {
                return (
                  <div
                    key={item.href}
                    className="group relative flex items-center"
                    onMouseEnter={() => {
                      if (scrolled) {
                        setPillVisible(true);
                        const trigger = linkRefs.current.get(item.href);
                        if (trigger) movePillTo(trigger);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      ref={(el) => {
                        if (el) linkRefs.current.set(item.href, el);
                      }}
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 14,
                        fontWeight: 600,
                        padding: scrolled ? "7px 16px" : "0 11px",
                        borderRadius: 980,
                        color: active
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.55)",
                        letterSpacing: "0.01em",
                        transition: "color 0.2s ease, padding 0.4s ease",
                        whiteSpace: "nowrap",
                        zIndex: 1,
                        userSelect: "none",
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 ease-out group-hover:rotate-180"
                        style={{ opacity: active ? 0.9 : 0.6 }}
                      />
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 z-50 pointer-events-none group-hover:pointer-events-auto">
                      <div
                        style={{
                          minWidth: 230,
                          background: "rgba(22, 22, 24, 0.94)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 18,
                          padding: "8px",
                          boxShadow:
                            "0 20px 48px -8px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
                          backdropFilter: "blur(28px)",
                          WebkitBackdropFilter: "blur(28px)",
                        }}
                      >
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group/item flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-150"
                              style={{
                                color: isChildActive
                                  ? "#eeece5"
                                  : "rgba(255,255,255,0.72)",
                                background: isChildActive
                                  ? "rgba(255,255,255,0.1)"
                                  : "transparent",
                                fontWeight: isChildActive ? 600 : 500,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.1)";
                                e.currentTarget.style.color = "#eeece5";
                              }}
                              onMouseLeave={(e) => {
                                if (!isChildActive) {
                                  e.currentTarget.style.background =
                                    "transparent";
                                  e.currentTarget.style.color =
                                    "rgba(255,255,255,0.72)";
                                }
                              }}
                            >
                              <span>{child.label}</span>
                              <span
                                className="opacity-0 -translate-x-1 transition-all duration-150 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                style={{
                                  color: "#ff6b57",
                                  fontSize: 13,
                                  fontWeight: 700,
                                }}
                              >
                                →
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    if (el) linkRefs.current.set(item.href, el);
                  }}
                  style={{
                    position: "relative",
                    fontSize: 14,
                    fontWeight: 600,
                    padding: scrolled ? "7px 16px" : "0 11px",
                    borderRadius: 980,
                    color: active
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.55)",
                    letterSpacing: "0.01em",
                    transition: "color 0.2s ease, padding 0.4s ease",
                    whiteSpace: "nowrap",
                    zIndex: 1,
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (scrolled) {
                      setPillVisible(true);
                      movePillTo(e.currentTarget);
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link
              href="/contact"
              className="uw-pill uw-glass"
              style={{ padding: "10px 20px", fontSize: 13 }}
            >
              Log In
            </Link>
            <Link
              href="/contact"
              className="uw-pill uw-btn-coral"
              style={{ padding: "10px 20px", fontSize: 13 }}
            >
              Book a Call
            </Link>
          </div>
        </div>

        {/* ── Mobile ── */}
        <div
          className={cn(
            "flex w-full items-center justify-between md:hidden transition-all duration-500",
            scrolled ? "mt-3 px-4" : "mt-0 px-6",
          )}
        >
          <div
            className="flex w-full items-center justify-between"
            style={{
              background: scrolled ? "rgba(22, 22, 24, 0.55)" : "transparent",
              border: scrolled
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid transparent",
              borderRadius: scrolled ? 980 : 0,
              padding: scrolled ? "10px 10px 10px 20px" : "18px 0",
              backdropFilter: scrolled ? "blur(24px)" : "none",
              WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
              boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.55)" : "none",
              transition: "all 0.5s ease",
            }}
          >
            <Link
              href="/"
              style={{
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.02em",
                color: "#eeece5",
              }}
              onClick={() => setOpen(false)}
            >
              Up<span style={{ color: "#ff6b57" }}>Wing</span>
            </Link>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text"
              style={{ background: "rgba(255,255,255,0.08)" }}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 rounded-full bg-text transition-all",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-text transition-opacity",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 rounded-full bg-text transition-all",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
