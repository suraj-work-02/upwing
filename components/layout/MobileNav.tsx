"use client";

import Link from "next/link";
import { site } from "@/content/site";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      id="mobile-nav"
      className="border-t border-border bg-bg-card/95 backdrop-blur-2xl md:hidden"
    >
      <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Mobile">
        {site.nav.map((item) => (
          <div key={item.href} className="flex flex-col gap-1">
            <Link
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base text-text transition-colors hover:bg-bg-elevated"
            >
              {item.label}
            </Link>
            {"children" in item &&
              item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="rounded-lg px-5 py-2.5 text-sm text-text-muted transition-colors hover:bg-bg-elevated hover:text-text"
                >
                  {child.label}
                </Link>
              ))}
          </div>
        ))}
        <Link
          href="/contact"
          onClick={onClose}
          className="uw-pill uw-btn-coral mt-4 w-full justify-center px-4 py-3 text-center text-sm"
        >
          Book a Call
        </Link>
      </nav>
    </div>
  );
}
