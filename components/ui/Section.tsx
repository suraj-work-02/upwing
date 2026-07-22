import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

export function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
