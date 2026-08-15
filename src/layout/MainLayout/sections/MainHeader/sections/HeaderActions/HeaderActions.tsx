import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function HeaderActions({ className }: { className?: string }) {
  const t = useTranslations("headerActions");

  return (
    <div className={`flex items-center gap-x-4 ${className ?? ""}`}>
      <Link
        href="/contacts"
        className="rounded-md bg-brand px-5 py-3 tracking-[0.16em] whitespace-nowrap text-night uppercase shadow-[0_0_16px_--alpha(var(--color-neon)/30%)] transition duration-300 hover:bg-brand/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        {t("contact")}
      </Link>
    </div>
  );
}
