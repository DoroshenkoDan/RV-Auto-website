import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Car } from "@/payload-types";

const STATUS_BADGE_CLASS: Record<Car["status"], string> = {
  available: "bg-brand/85",
  inTransit: "bg-night-soft/85",
  auction: "bg-ink/85",
};

export function CarStatusBadge({
  status,
  className = "",
}: {
  status: Car["status"];
  className?: string;
}) {
  const t = useTranslations("carCard.status");

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[clamp(0.600rem,0.53rem+0.12vw,0.725rem)] leading-[1.3] font-semibold tracking-wide text-white uppercase",
        STATUS_BADGE_CLASS[status],
        className,
      )}
    >
      {t(status)}
    </span>
  );
}
