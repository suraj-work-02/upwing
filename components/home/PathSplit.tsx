import Link from "next/link";
import { services } from "@/content/services";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/Section";
import { Building2, Rocket, ArrowRight } from "@/components/ui/Icons";

export function PathSplit() {
  const [companies, seekers] = services;

  return (
    <Section>
      <FadeIn>
        <div className="text-center">
          <span className="badge">Choose your path</span>
        </div>
      </FadeIn>

      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <FadeIn delay={100}>
          <PathCard
            href={companies.href}
            audience={companies.audience}
            title={companies.shortTitle}
            summary={companies.summary}
            cta={companies.cta}
            icon={<Building2 size={24} />}
            accentColor="accent"
          />
        </FadeIn>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-3 md:h-full md:justify-center">
            <span className="hidden h-20 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent md:block" />
            <span className="rounded-full border border-border bg-bg-card px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              or
            </span>
            <span className="hidden h-20 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent md:block" />
          </div>
        </div>

        <FadeIn delay={200}>
          <PathCard
            href={seekers.href}
            audience={seekers.audience}
            title={seekers.shortTitle}
            summary={seekers.summary}
            cta={seekers.cta}
            icon={<Rocket size={24} />}
            accentColor="cyan"
          />
        </FadeIn>
      </div>
    </Section>
  );
}

function PathCard({
  href,
  audience,
  title,
  summary,
  cta,
  icon,
  accentColor,
}: {
  href: string;
  audience: string;
  title: string;
  summary: string;
  cta: string;
  icon: React.ReactNode;
  accentColor: "accent" | "cyan";
}) {
  const colors = {
    accent: {
      iconBg: "bg-accent/10 text-accent-light ring-accent/20",
      hoverBorder: "group-hover:border-accent/30",
      line: "from-accent to-accent-bright",
    },
    cyan: {
      iconBg: "bg-cyan/10 text-cyan ring-cyan/20",
      hoverBorder: "group-hover:border-cyan/30",
      line: "from-cyan to-accent-bright",
    },
  };

  const c = colors[accentColor];

  return (
    <Link
      href={href}
      className={`card card-glow group relative flex h-full flex-col p-8 md:p-10 ${c.hoverBorder}`}
    >
      {/* Accent line */}
      <span
        className={`absolute left-0 top-8 h-10 w-0.5 rounded-full bg-gradient-to-b ${c.line} transition-all duration-500 group-hover:h-16`}
        aria-hidden
      />

      {/* Icon */}
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${c.iconBg} ring-1 transition-colors duration-300`}
      >
        {icon}
      </div>

      <p className="eyebrow text-accent-light">{audience}</p>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted md:text-[0.95rem]">
        {summary}
      </p>
      <span className="link-arrow mt-8 text-sm font-medium text-text-secondary group-hover:text-accent-light">
        {cta}
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}
