import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Section, SectionTitle } from "@/ui/section";

import { LIGHT_CARD } from "../../cardStyles";
import { PLATFORMS, type PlatformId } from "../../servicesConfig";

export function ServicePlatforms({
  platforms,
}: {
  platforms: readonly PlatformId[];
}) {
  const t = useTranslations("services");

  return (
    <Section>
      <SectionTitle>{t("platformsSection.title")}</SectionTitle>

      <ul className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((id) => {
          const platform = PLATFORMS[id];
          const logo = "logo" in platform ? platform.logo : null;

          return (
            <li key={id} className={cn(LIGHT_CARD, "flex flex-col p-block")}>
              {logo && (
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  unoptimized={logo.src.endsWith(".svg")}
                  className="mb-stack h-10 w-auto self-start object-contain"
                />
              )}

              <h3 className="font-logo text-h3 font-bold text-ink">
                {t(`platforms.${id}.name`)}
              </h3>

              <p className="mt-title-tight text-body text-ink-muted">
                {t(`platforms.${id}.description`)}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
