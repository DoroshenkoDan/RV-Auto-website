import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";

const CHROME =
  "font-normal tracking-nav whitespace-nowrap uppercase shadow-[0_0_16px_--alpha(var(--color-neon)/30%)] transition duration-300 focus-visible:outline-offset-4";

export function ContactCta({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const t = useTranslations("headerActions");

  return (
    <Link
      href="/contacts"
      onClick={onClick}
      className={buttonVariants({ className: cn(CHROME, className) })}
    >
      {t("contact")}
    </Link>
  );
}
