export const services = [
  {
    slug: "recruitment",
    title: "Recruitment & Talent Solutions",
    shortTitle: "Recruitment",
    audience: "For Companies",
    summary:
      "End-to-end talent acquisition that moves faster than traditional hiring—without sacrificing who you bring in.",
    description:
      "We help modern teams hire the right people faster and at lower cost. From market mapping to sourcing and hiring automation, every engagement is built around how your team actually works.",
    href: "/services/recruitment",
    cta: "Explore Recruitment",
    highlights: ["Talent Sourcing", "Market Analysis", "Hiring Automation"],
    features: [
      {
        title: "Market Mapping",
        description:
          "See where talent sits in your market, what competitors pay, and which channels actually convert.",
      },
      {
        title: "Database Management",
        description:
          "Keep candidate pipelines organized, searchable, and ready so you never start from zero on the next role.",
      },
      {
        title: "Hiring Automation",
        description:
          "Reduce manual screening and coordination with workflows that free your team to focus on decisions that matter.",
      },
      {
        title: "Talent Sourcing",
        description:
          "Active outreach to qualified candidates across tech, finance, healthcare, and professional services.",
      },
    ],
    outcomes: [
      { value: "500+", label: "Hires made" },
      { value: "2–5x", label: "ROI improvement" },
      { value: "Faster", label: "Time-to-hire" },
    ],
  },
  {
    slug: "career-development",
    title: "Career Development Services",
    shortTitle: "Career Development",
    audience: "For Job Seekers",
    summary:
      "Direct coaching and hands-on placement support to help you land a role at a top company with a real plan.",
    description:
      "Whether you are an international graduate or a professional ready for the next step, we combine career strategy, interview readiness, and placement support so you move with clarity—not guesswork.",
    href: "/services/career-development",
    cta: "Start Your Journey",
    highlights: ["Career Coaching", "Interview Prep", "Placement Support"],
    features: [
      {
        title: "Career Coaching",
        description:
          "A clear plan for positioning, targeting roles, and telling a story employers actually respond to.",
      },
      {
        title: "Interview Preparation",
        description:
          "Practice that mirrors real interviews—behavioral, technical, and culture fit—so you show up ready.",
      },
      {
        title: "Placement Support",
        description:
          "Hands-on guidance through applications, outreach, and offers until you are placed in the right seat.",
      },
      {
        title: "Market Guidance",
        description:
          "Honest advice on timelines, industries, and role fit based on how hiring markets work today.",
      },
    ],
    outcomes: [
      { value: "4 mo", label: "Typical placement path" },
      { value: "5,000+", label: "Professionals served" },
      { value: "Top US", label: "Company placements" },
    ],
  },
] as const;

export type Service = (typeof services)[number];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
