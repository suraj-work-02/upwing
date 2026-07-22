import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export function ServiceHero({
  audience,
  title,
  description,
  cta,
  ctaHref,
}: {
  audience: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
}) {
  return (
    <PageHero
      eyebrow={audience}
      title={title}
      description={description}
      cta={{ href: ctaHref, label: cta }}
    />
  );
}
