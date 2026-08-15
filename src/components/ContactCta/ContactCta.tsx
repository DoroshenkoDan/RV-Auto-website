import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";

const CHROME =
  "font-normal tracking-[0.16em] whitespace-nowrap uppercase shadow-[0_0_16px_--alpha(var(--color-neon)/30%)] transition duration-300 focus-visible:outline-offset-4";

export function ContactCta({
  size = "sm",
  className,
  onClick,
}: {
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
}) {
  const t = useTranslations("headerActions");

  return (
    <Link
      href="/contacts"
      onClick={onClick}
      className={buttonVariants({ size, className: cn(CHROME, className) })}
    >
      {t("contact")}
    </Link>
  );
}
