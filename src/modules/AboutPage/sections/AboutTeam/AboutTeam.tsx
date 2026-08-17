import { useTranslations } from "next-intl";

import { Section, SectionTitle } from "@/ui/section";

import { TeamCard } from "./components/TeamCard";
import { TEAM } from "./team";

export function AboutTeam() {
  const t = useTranslations("aboutPage.team");

  return (
    <Section>
      <SectionTitle spacing="tight" className="max-w-3xl">
        {t("title")}
      </SectionTitle>

      <p className="mb-8 max-w-2xl text-[15px] leading-normal text-ink-muted lg:mb-10">
        {t("description")}
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {TEAM.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </Section>
  );
}
