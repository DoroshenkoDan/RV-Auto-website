import { useTranslations } from "next-intl";

import { CtaSection } from "@/components/CtaSection";

import { AboutIntro } from "./sections/AboutIntro";
import { AboutStats } from "./sections/AboutStats";
import { AboutStory } from "./sections/AboutStory";
import { AboutTeam } from "./sections/AboutTeam";

export function AboutPage() {
  const t = useTranslations("aboutPage.cta");

  return (
    <>
      <AboutIntro />
      <AboutStory />
      <AboutStats />
      <AboutTeam />
      <CtaSection title={t("title")} description={t("description")} />
    </>
  );
}
