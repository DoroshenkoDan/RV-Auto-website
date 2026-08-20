import { getLocale, getTranslations } from "next-intl/server";

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

      <div className="grid gap-stack sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </Section>
  );
}
