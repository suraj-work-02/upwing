export const site = {
  name: "UpWing",
  tagline: "Hire smarter. Get hired faster.",
  description:
    "UpWing connects companies with the talent they need and helps professionals land roles that move careers forward.",
  contact: {
    email: "hello@upwing.com",
    sales: "sales@upwing.com",
    phone: "+1 (555) 010-2040",
    phoneHref: "tel:+15550102040",
    address: "30 N Gould St Ste R, Sheridan, WY 82801",
  },
  stats: [
    { value: "500+", label: "Companies served" },
    { value: "95%", label: "Client satisfaction" },
    { value: "5,000+", label: "Professionals supported" },
    { value: "10+", label: "Years of excellence" },
  ],
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "/services",
      label: "Services",
      children: [
        { href: "/services/recruitment", label: "Recruitment" },
        {
          href: "/services/career-development",
          label: "Career Development",
        },
      ],
    },
    { href: "/contact", label: "Contact" },
  ],
  footerLinks: {
    services: [
      { href: "/services/recruitment", label: "Recruitment Solutions" },
      {
        href: "/services/career-development",
        label: "Career Development",
      },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/contact", label: "Schedule Consultation" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
} as const;
