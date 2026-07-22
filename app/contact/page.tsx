import type { Metadata } from "next";
import { site } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { Mail, Phone, MapPin } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Schedule a consultation or reach the UpWing team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next hire—or your next role"
        description="Tell us what you are working on. We will follow up with a clear next step."
      />

      <section style={{ padding: "80px 28px 120px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 12px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 48,
              alignItems: "start",
            }}
          >
            <FadeIn>
              <ContactForm />
            </FadeIn>

            <FadeIn delay={100}>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#ff6b57",
                    marginBottom: 6,
                  }}
                >
                  Direct Channels
                </div>
                <h2
                  style={{
                    fontSize: "clamp(24px, 3vw, 34px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    margin: "0 0 28px",
                  }}
                >
                  Reach us directly
                </h2>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div
                    className="uw-neu"
                    style={{ borderRadius: 20, padding: 24 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 12,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "#ff6b57",
                        marginBottom: 12,
                      }}
                    >
                      <Mail size={16} />
                      Email
                    </div>
                    <div>
                      <a
                        href={`mailto:${site.contact.email}`}
                        style={{
                          display: "block",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "var(--text)",
                          marginBottom: 4,
                        }}
                      >
                        {site.contact.email}
                      </a>
                      <a
                        href={`mailto:${site.contact.sales}`}
                        style={{
                          display: "block",
                          fontSize: 14,
                          opacity: 0.65,
                          color: "var(--text)",
                        }}
                      >
                        {site.contact.sales}
                      </a>
                    </div>
                  </div>

                  <div
                    className="uw-neu"
                    style={{ borderRadius: 20, padding: 24 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 12,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "#ff6b57",
                        marginBottom: 12,
                      }}
                    >
                      <Phone size={16} />
                      Phone
                    </div>
                    <div>
                      <a
                        href={site.contact.phoneHref}
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "var(--text)",
                        }}
                      >
                        {site.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div
                    className="uw-neu"
                    style={{ borderRadius: 20, padding: 24 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 12,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "#ff6b57",
                        marginBottom: 12,
                      }}
                    >
                      <MapPin size={16} />
                      Office
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        opacity: 0.8,
                        lineHeight: 1.6,
                        color: "var(--text)",
                      }}
                    >
                      {site.contact.address}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    marginTop: 32,
                    fontSize: 13,
                    opacity: 0.5,
                    lineHeight: 1.5,
                  }}
                >
                  Dummy contact details for demo purposes. Replace with real
                  business information before launch.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
