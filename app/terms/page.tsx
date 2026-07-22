import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Upwia.",
};

export default function TermsPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: July 19, 2026</p>
      <div className="mt-10 max-w-3xl space-y-6 text-sm leading-relaxed text-text-muted md:text-base">
        <p>
          By accessing the {site.name} website, you agree to these terms. This
          document is a sample for demonstration and should be reviewed by legal
          counsel before production use.
        </p>
        <h2 className="font-display text-xl font-bold text-text">
          Use of the site
        </h2>
        <p>
          You may browse this site for informational purposes. You agree not to
          misuse the site, attempt unauthorized access, or disrupt its
          operation.
        </p>
        <h2 className="font-display text-xl font-bold text-text">
          Services
        </h2>
        <p>
          Descriptions of recruitment and career development services are
          informational. Engagement terms are defined in separate agreements
          when you work with us.
        </p>
        <h2 className="font-display text-xl font-bold text-text">
          Contact
        </h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${site.contact.email}`} className="text-accent-light transition-colors hover:text-accent-bright">
            {site.contact.email}
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
