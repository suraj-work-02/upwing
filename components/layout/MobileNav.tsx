"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { ChevronDown } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!open) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div id="mobile-nav" className="mobile-nav-overlay md:hidden">
        <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Mobile">
        {site.nav.map((item) => {
          const hasChildren =
            "children" in item && Boolean(item.children?.length);
          const isExpanded = expanded === item.href;

          return (
            <div key={item.href} className="flex flex-col gap-1">
              {hasChildren ? (
                <button
                  onClick={() => setExpanded(isExpanded ? null : item.href)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base text-text transition-colors hover:bg-bg-elevated"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform duration-200",
                      isExpanded && "rotate-180",
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block w-full rounded-lg px-3 py-3 text-base text-text transition-colors hover:bg-bg-elevated"
                >
                  {item.label}
                </Link>
              )}

              {hasChildren && isExpanded && (
                <div className="flex flex-col gap-1 pl-2">
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block w-full rounded-lg px-5 py-2.5 text-sm text-text-muted transition-colors hover:bg-bg-elevated hover:text-text"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <Link
          href="/contact"
          onClick={onClose}
          className="uw-pill uw-btn-coral mt-4 w-full justify-center px-4 py-3 text-center text-sm"
        >
          Book a Call
        </Link>
        </nav>
      </div>
    </>
  );
}
