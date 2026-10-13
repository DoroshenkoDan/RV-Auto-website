import { useTranslations } from "next-intl";

import { Section } from "@/ui/section";

import { PRIVACY_SECTIONS } from "./privacyConfig";
import { privacyRichTags } from "./privacyTags";

export function PrivacyPage() {
  const t = useTranslations("privacyPage");

  return (
    <>
      <Section
        data-page-hero
        tone="dark"
        className="relative isolate overflow-hidden pt-[calc(var(--header-h)+var(--spacing-section))]"
      >
        <p className="font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
          [{t("hero.eyebrow")}]
        </p>

        <h1 className="mt-stack max-w-4xl font-logo text-h1 font-bold text-sand">
          {t("hero.title")}
        </h1>

        <p className="mt-stack max-w-2xl text-lead text-sand/70">
          {t("hero.lede")}
        </p>

        <p className="mt-section-title font-mono text-caption tracking-[0.08em] text-brand/70 uppercase">
          {t("hero.updated")}
        </p>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 right-0 -z-10 size-120 translate-x-1/3 rounded-full bg-brand/12 blur-2xl"
        />
      </Section>

      <Section>
        <div className="flex max-w-3xl flex-col gap-block">
          {PRIVACY_SECTIONS.map((id, index) => (
            <section key={id} id={id} aria-labelledby={`${id}-title`}>
              <div className="flex items-baseline gap-x-3">
                <p className="shrink-0 font-mono text-caption font-bold tracking-[0.18em] text-brand uppercase">
                  [{String(index + 1).padStart(2, "0")}]
                </p>

                <h2
                  id={`${id}-title`}
                  className="font-logo text-h3 font-bold text-ink"
                >
                  {t(`sections.${id}.title`)}
                </h2>
              </div>

              <div className="mt-stack text-body text-ink-muted">
                {t.rich(`sections.${id}.body`, privacyRichTags)}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
