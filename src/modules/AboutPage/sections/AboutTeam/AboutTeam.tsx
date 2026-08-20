import { getLocale, getTranslations } from "next-intl/server";

import { CardCarousel } from "@/components/CardCarousel";
import type { Locale } from "@/i18n/routing";
import { getTeamMembers } from "@/lib/payload/team";
import { Section, SectionTitle } from "@/ui/section";

import { TeamCard } from "./components/TeamCard";

export async function AboutTeam() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("aboutPage.team");
  const members = await getTeamMembers(locale);

  if (members.length === 0) return null;

  return (
    <Section>
      <SectionTitle spacing="tight" className="max-w-3xl">
        {t("title")}
      </SectionTitle>

      <p className="mb-section-title max-w-2xl text-body text-ink-muted">
        {t("description")}
      </p>

      <CardCarousel itemClassName="basis-[85%] sm:basis-1/2 lg:basis-1/3">
        {members.map((member) => (
          <TeamCard key={member.id} member={member} className="h-full" />
        ))}
      </CardCarousel>
    </Section>
  );
}
