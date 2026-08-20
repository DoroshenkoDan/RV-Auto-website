import { useTranslations } from "next-intl";

import { StatusScreen } from "@/components/StatusScreen";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/ui/button";

export default function NotFound() {
  const t = useTranslations("errorPages");

  return (
    <StatusScreen
      eyebrow={t("eyebrowNotFound")}
      titleLead={t("titleLead")}
      titleAccent={t("titleAccent")}
      description={t("descriptionNotFound")}
    >
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        {t("home")}
      </Link>

      <Link
        href="/cars"
        className={buttonVariants({ variant: "outlineOnDark", size: "lg" })}
      >
        {t("catalog")}
      </Link>
    </StatusScreen>
  );
}
