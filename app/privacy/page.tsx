import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Upwia.",
};

export default function PrivacyPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: July 19, 2026</p>
      <div className="mt-10 max-w-3xl space-y-6 text-sm leading-relaxed text-text-muted md:text-base">
        <p>
          This privacy policy describes how {site.name} (&quot;we&quot;,
          &quot;us&quot;) handles information collected through this website.
          This is a sample policy for demonstration purposes.
        </p>
        <h2 className="font-display text-xl font-bold text-text">
          Information we collect
        </h2>
        <p>
          When you submit a contact form, we may collect your name, email
          address, and the message you provide. We use this information only to
          respond to your inquiry.
        </p>
        <h2 className="font-display text-xl font-bold text-text">
          How we use information
        </h2>
        <p>
          We do not sell personal information. Demo submissions on this site are
          not transmitted to a backend and remain in your browser session only.
        </p>
        <h2 className="font-display text-xl font-bold text-text">
          Contact
        </h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${site.contact.email}`} className="text-accent-light transition-colors hover:text-accent-bright">
            {site.contact.email}
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
