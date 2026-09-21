import { useTranslations } from "next-intl";

import { Section, SectionTitle } from "@/ui/section";

import { PaymentMark } from "../../components/PaymentMark";
import { IMPORT_SEARCH_STEPS, type Transport } from "../../servicesConfig";

const PAID_STAGES = ["customs", "repair"] as const;

function StageHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-label font-bold tracking-widest text-brand">
        [{index}]
      </span>
      <h3 className="text-h3 font-bold text-sand">{title}</h3>
    </div>
  );
}

export function ImportStages({ transport }: { transport: Transport }) {
  const t = useTranslations("services.importStages");

  return (
    <Section tone="dark">
      <SectionTitle>{t("title")}</SectionTitle>

      <div className="grid gap-stack lg:grid-cols-3">
        <article className="rounded-lg border border-brand/12 bg-brand/10 p-block lg:col-span-2 lg:row-span-2">
          <StageHeading index={1} title={t("search.title")} />

          <p className="mt-title-tight text-body text-sand/60">
            {t("search.description")}
          </p>

          <ol className="mt-stack flex flex-col">
            {IMPORT_SEARCH_STEPS.map(({ id, payment }, index) => (
              <li
                key={id}
                className="flex flex-col gap-2 border-t border-sand/10 py-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="flex items-baseline gap-3 text-body text-sand">
                  <span className="font-mono text-label text-brand/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {t(`search.items.${id}`, { transport })}
                </span>

                {payment && <PaymentMark className="sm:ml-auto" />}
              </li>
            ))}
          </ol>
        </article>

        {PAID_STAGES.map((stage, index) => (
          <article
            key={stage}
            className="flex flex-col rounded-lg border border-brand/12 bg-brand/10 p-block"
          >
            <StageHeading index={index + 2} title={t(`${stage}.title`)} />

            <p className="mt-title-tight text-body text-sand/60">
              {t(`${stage}.description`)}
            </p>

            <PaymentMark className="mt-stack" />
          </article>
        ))}
      </div>
    </Section>
  );
}
