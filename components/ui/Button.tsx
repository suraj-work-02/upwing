import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
};

const variants = {
  primary:
    "bg-accent text-white shadow-[0_0_20px_-4px_rgba(99,102,241,0.4)] hover:bg-accent-light hover:shadow-[0_0_32px_-4px_rgba(99,102,241,0.55)] focus-visible:outline-accent",
  secondary:
    "bg-bg-elevated text-text hover:bg-bg-card border border-border hover:border-border-hover focus-visible:outline-accent",
  ghost:
    "bg-transparent text-text-secondary hover:text-text hover:bg-bg-elevated focus-visible:outline-accent",
  outline:
    "bg-transparent text-text border border-border hover:border-accent/40 hover:bg-accent/5 hover:text-accent-light focus-visible:outline-accent",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
