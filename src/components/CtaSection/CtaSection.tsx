import { ContactForm } from "@/components/ContactForm";
import { cn } from "@/lib/utils";
import { Section, SectionTitle } from "@/ui/section";

// Copy stays with each page so every page can tailor its own CTA.
export function CtaSection({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Section
      tone="dark"
      className={cn("relative isolate overflow-hidden", className)}
    >
      <SectionTitle
        align="center"
        spacing="tight"
        className="mx-auto max-w-2xl"
      >
        {title}
      </SectionTitle>

      <p className="mx-auto max-w-lg text-center text-[15px] leading-normal text-sand/60">
        {description}
      </p>

      <ContactForm layout="row" className="mx-auto mt-8 max-w-3xl lg:mt-10" />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 left-20 -z-10 size-120 -translate-x-1/2 rounded-full bg-brand/12 blur-2xl"
      />
    </Section>
  );
}
