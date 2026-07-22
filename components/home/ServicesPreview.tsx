import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

const services = [
  {
    bg: "#f7c9c2",
    pill: "Staffing",
    title: "Staffing Solutions",
    description:
      "Flexible workforce models structured around your timeline and internal capacity.",
    items: [
      "Contract staffing",
      "Contract-to-hire",
      "Staff augmentation",
      "Payroll & compliance handled",
    ],
    cta: "Explore Staffing →",
    href: "/services/recruitment",
    img: "/assets/staffing-solution.png",
  },
  {
    bg: "#f9dfae",
    pill: "Recruitment",
    title: "Recruitment & Talent Acquisition",
    description:
      "End-to-end sourcing that moves faster than traditional hiring, without cutting corners.",
    items: [
      "Market mapping",
      "Candidate database management",
      "Hiring process automation",
      "Dedicated recruiter pods",
    ],
    cta: "Explore Recruitment →",
    href: "/services/recruitment",
    img: "/assets/recruitement-and-talent-acquisition.png",
  },
  {
    bg: "#dcd6f7",
    pill: "Career",
    title: "Career Coaching & Development",
    description:
      "Direct, hands-on coaching that gets you from application to offer.",
    items: [
      "1:1 career coaching",
      "Resume & portfolio review",
      "Interview preparation",
      "Hands-on placement support",
    ],
    cta: "Explore Career Coaching →",
    href: "/services/career-development",
    img: "/assets/career-coaching-and-developement.png",
  },
];

export function ServicesPreview() {
  return (
    <section style={{ padding: "100px 28px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
        <FadeIn>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#ff6b57",
              marginBottom: 6,
            }}
          >
            What We Do
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 600,
              margin: "0 0 34px",
            }}
          >
            Three ways we move people and businesses forward
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {services.map((svc, i) => (
            <FadeIn key={svc.pill} delay={i * 120}>
              <div
                className="uw-svc uw-glossy"
                style={{ background: svc.bg, height: "100%" }}
              >
                {/* Illustration */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.3)",
                    marginBottom: 12,
                    position: "relative",
                  }}
                >
                  <img
                    src={svc.img}
                    alt={svc.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "bottom center",
                    }}
                  />
                </div>

                <span
                  className="uw-pill"
                  style={{
                    background: "#fff",
                    padding: "6px 14px",
                    fontSize: 12,
                    width: "fit-content",
                  }}
                >
                  {svc.pill}
                </span>

                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
                  {svc.title}
                </h3>

                <p style={{ margin: 0, fontSize: 14, opacity: 0.75 }}>
                  {svc.description}
                </p>

                <ul className="uw-svc" style={{ padding: 0, gap: 9 }}>
                  {svc.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <Link
                  href={svc.href}
                  className="uw-pill uw-btn-steel"
                  style={{
                    padding: "10px 18px",
                    fontSize: 13,
                    width: "fit-content",
                    marginTop: "auto",
                  }}
                >
                  {svc.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
