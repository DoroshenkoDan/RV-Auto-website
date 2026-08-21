import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function SectionFallback({ className = "" }: Props) {
  const t = useTranslations("sectionFallback");

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-3xl border-2 border-dashed border-line bg-surface px-6 py-block text-center",
        className,
      )}
    >
      <p className="font-mono text-label font-bold tracking-[0.18em] text-brand uppercase">
        [{t("eyebrow")}]
      </p>

      <div className="relative isolate mt-stack w-[clamp(7rem,18vw,11rem)] animate-lamp motion-reduce:animate-none">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 m-auto aspect-square rounded-full bg-brand/15 blur-2xl"
        />

        <span
          aria-hidden
          className="block aspect-3/2 w-full bg-brand [mask-image:url(/images/shared/sectionError.webp)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]"
        />
      </div>

      <h3 className="mt-stack font-logo text-h3 font-bold text-balance text-ink">
        {t("title")}
      </h3>

      <p className="mt-2 max-w-md text-body text-pretty text-ink-muted">
        {t("description")}
      </p>
    </div>
  );
}
