import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export function PaymentMark({ className }: { className?: string }) {
  const t = useTranslations("services.importStages");

  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-sm bg-brand/15 px-2 py-0.5 font-mono text-caption font-bold tracking-widest text-brand uppercase",
        className,
      )}
    >
      <CreditCard aria-hidden className="size-3.5" />
      {t("payment")}
    </span>
  );
}
