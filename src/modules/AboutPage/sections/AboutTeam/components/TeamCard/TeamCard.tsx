import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import type { TeamMember } from "../../team";

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function TeamCard({
  member,
  className = "",
}: {
  member: TeamMember;
  className?: string;
}) {
  const t = useTranslations("aboutPage.team");

  const rows = [
    { label: t("stats.age"), value: t("values.years", { count: member.age }) },
    {
      label: t("stats.experience"),
      value: t("values.years", { count: member.yearsInField }),
    },
    {
      label: t("stats.cars"),
      value: t("values.cars", { count: member.carsDelivered }),
    },
  ];

  return (
    <article
      className={cn(
        "overflow-hidden rounded-3xl border border-line bg-white",
        className,
      )}
    >
      <div className="relative aspect-3/4 bg-night-soft">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={t("photoAlt", { name: member.name, role: member.role })}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center font-logo text-display font-bold text-brand/30"
            >
              {initialsOf(member.name)}
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-1/4 left-1/2 size-64 -translate-x-1/2 rounded-full bg-brand/12 blur-2xl"
            />
          </>
        )}
      </div>

      <div className="p-block">
        <h3 className="text-h3 font-bold text-ink">{member.name}</h3>
        <p className="mt-1 text-label text-ink-muted">{member.role}</p>

        <dl className="mt-title-tight border-t border-line">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-2 border-b border-line py-2.5"
            >
              <dt className="text-caption tracking-wide text-ink-muted uppercase">
                {row.label}
              </dt>
              <dd className="font-mono text-label font-bold text-ink">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
