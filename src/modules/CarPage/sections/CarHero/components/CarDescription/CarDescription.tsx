import { useTranslations } from "next-intl";

export function CarDescription({
  description,
  className = "",
}: {
  description: string;
  className?: string;
}) {
  const t = useTranslations("carPage.description");

  return (
    <section className={className}>
      <h2 className="mb-stack font-logo text-h3 font-bold">{t("title")}</h2>
      <p className="max-w-prose text-body whitespace-pre-line text-ink/80">
        {description}
      </p>
    </section>
  );
}
