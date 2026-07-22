import Link from "next/link";

const footerLinks = {
  services: [
    { href: "/services/recruitment", label: "Staffing Solutions" },
    {
      href: "/services/recruitment",
      label: "Recruitment & Talent Acquisition",
    },
    { href: "/services/career-development", label: "Career Coaching" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Job Seekers" },
    { href: "/services", label: "Companies" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer
      style={{
        padding: "40px 28px 26px",
        borderTop: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 32,
            marginBottom: 28,
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                fontWeight: 800,
                fontSize: 20,
                display: "inline-block",
                marginBottom: 10,
              }}
            >
              Up<span style={{ color: "#ff6b57" }}>Wing</span>
            </Link>
            <p
              style={{
                fontSize: 14,
                opacity: 0.65,
                maxWidth: 260,
                margin: "0 0 14px",
                lineHeight: 1.6,
              }}
            >
              Hire smarter. Get hired faster. Staffing, recruitment and career
              development, built around real outcomes.
            </p>
            <div style={{ fontSize: 13, opacity: 0.7 }}>hello@upwing.com</div>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                opacity: 0.45,
                marginBottom: 12,
              }}
            >
              Services
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: 14,
              }}
            >
              {footerLinks.services.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                opacity: 0.45,
                marginBottom: 12,
              }}
            >
              Company
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: 14,
              }}
            >
              {footerLinks.company.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                opacity: 0.45,
                marginBottom: 12,
              }}
            >
              Legal
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: 14,
              }}
            >
              {footerLinks.legal.map((link) => (
                <Link key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,.08)",
            fontSize: 13,
            opacity: 0.55,
            fontWeight: 600,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div>© {new Date().getFullYear()} UpWing. All rights reserved.</div>
          <div>Serving clients across the United States</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
